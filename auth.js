var mongoose = require('mongoose');
var userModel = require('./models/user');
mongoose.connect(process.env.MONGO_SRV, { useNewUrlParser: true, useUnifiedTopology: true });
if(process.env.PRODUCTION == "true") {
    mongoose.connection.useDb('brainbase');
}
function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }           
    return text;
}
function generateSecretKey() {
    return `${generateRandomString(6)}-${generateRandomString(6)}-${generateRandomString(6)}`
}

function setupFor(app) {
    app.get('/login', function(req, res) {
        res.end(require('fs').readFileSync('public/login.html', {encoding: 'utf-8'}));
    });
    app.use('/user/login', async function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        await userModel.findOne({username: username})
        .then(function(user) {
            if(user == null) {
                res.send({success: false, 'error': 'User not found'});
            }else if(user.password != password) {
                res.send({success: false, 'error': 'Invalid username or password'});
            }else {
                res.send({success: true, key: user.secretKey});
            }
        });
    });
    app.use('/user/register', async function (req, res) {
        var key = generateSecretKey();
        res.type('application/json');
        if(req.body.username == null || req.body.password == null || req.body.email == null || req.body == null ||
           req.body.username == undefined || req.body.password == undefined || req.body.email == undefined || req.body == undefined ||
           req.body.username.trim() == "" || req.body.password.trim() == "" || req.body.email.trim() == "") {
            res.send({"error": 'Missing username, password, or email', "success": false});
        } else {
            var continueAfterFind = true;
            userModel.findOne({email: req.body.email})
            .then((doc) => {
                if(doc != null) {
                    res.send({"error": 'Email already exists!', "success": false});
                    continueAfterFind = false;
                    return;
                }
            })
            .then(() => {
                if (!continueAfterFind) return;
                userModel.findOne({username: req.body.username})
                .then((doc) => {
                    if(doc != null) {
                        res.send({"error": 'Username already exists!', "success": false});
                        continueAfterFind = false;
                        return;
                    }
                })
                .then(async () => {
                    if (!continueAfterFind) return;
                    try {
                        var user = new userModel({
                            username: req.body.username,
                            password: req.body.password,
                            email: req.body.email,
                            secretKey: key
                        });
                        var done = false;
                        await mongoose.connection.collection('users').insertOne(user).catch(err => {
                            res.send({"error": "Email or password already exists", "success": false});
                            done = true;
                            return;
                        });
                        if(done == true) {
                            return;
                        } else {
                            res.send({
                                success: true,
                                secret: key
                            });
                        }
                    } catch(exc) {
                        res.send({"error": exc.message, success: false});
                    }
                });
            });
        }
    });
    
}
module.exports = setupFor;