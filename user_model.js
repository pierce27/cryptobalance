var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    investmentData: Object
});
module.exports = mongoose.model('users', userSchema);    

