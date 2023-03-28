var mongoose = require('mongoose');
var userModel = require('./models/user');
var STRIPE_PRODUCTION = false;
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
    
    app.use('/user/check/premium', async function (req, res) {
        var key = req.body.key;
        if(key == null || key == undefined || key.trim() == "") {
            res.send({success: false, error: "Missing key"});
        } else {
            await userModel.findOne({secretKey: key})
            .then(function(user) {
                if(user == null) {
                    res.send({success: false, error: "User not found", premium: false});
                } else {
                    res.send({success: true, premium: user.premium});
                }
            });
        }
    });
    app.use('/user/check/exists', async function (req, res) {
        var key = req.body.key;
        if(key == null || key == undefined || key.trim() == "") {
            res.send({success: false, error: "Missing key"});
        } else {
            await userModel.findOne({secretKey: key})
            .then(function(user) {
                if(user == null) {
                    res.send({success: false, error: "User not found", exists: false});
                } else {
                    res.send({success: true, exists: true});
                }
            });
        }
    });
    // Route to serve the news.html file
    app.use('/news', (req, res) => {
        const fs = require('fs');
        const newsHtml = fs.readFileSync('public/news.html', 'utf-8');
        res.end(newsHtml);
    });

    // Route to serve the contents of news.json file
    app.use('/listnews', (req, res) => {
        const fs = require('fs');
        const newsJson = fs.readFileSync('news.json', 'utf-8');
        res.json(JSON.parse(newsJson));
    });

    app.use('/announce', async (req, res)=>{
        var content = {
            title: req.body.title,
            body: require('marked').marked(req.body.content),
            author: req.body.author
        };
        var fs = require('fs');
        try {
            let data = fs.readFileSync('news.json', 'utf8');
            let news = JSON.parse(data);
            news.push(content);
            let json = JSON.stringify(news);
            fs.writeFileSync('news.json', json, 'utf8');
            console.log("Announcement saved successfully!");
        } catch (err) {
            console.log(err);
            res.end('Failure');
            return;
        }
        res.end('Success!');
    });    
    
    const stripe = require('stripe');
    var stripeApp = new stripe.Stripe(STRIPE_PRODUCTION ? process.env.STRIPE_SECRET : process.env.STRIPE_SECRET_TEST);

    // Define a new route for processing payments
    app.post('/stripe/create-intent', (req, res) => {
        const amount = 1000; // amount in cents
        const currency = req.body.currency;

        stripeApp.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card']
        }).then(intent => {
            res.send({secret: intent.client_secret});
        });
    });
    app.get('/stripe/config', (req, res)=>{res.json({pubKey: (STRIPE_PRODUCTION ? process.env.STRIPE_PUBLIC : process.env.STRIPE_PUBLIC_TEST)})})
    
    app.use('/user/check/admin', async function (req, res) {
        var key = req.body.key;
        if(key == null || key == undefined || key.trim() == "") {
            res.send({success: false, error: "Missing key"});
        } else {
            await userModel.findOne({secretKey: key})
            .then(function(user) {
                if(user == null) {
                    res.send({success: false, error: "User not found", admin: false});
                } else {
                    res.send({success: true, admin: user.admin});
                }
            });
        }
    });
    
}
module.exports = setupFor;