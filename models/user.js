var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    premium: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
    secretKey: {type: String, required: true, unique: true}
});
module.exports = mongoose.model('User', UserSchema);
