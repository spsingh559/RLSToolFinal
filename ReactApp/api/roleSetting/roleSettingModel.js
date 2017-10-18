var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RLSDB');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    _id:Date,
    roleName: String
});

var roleSetting = mongoose.model('rolesettings', UserSchema);

exports = module.exports = roleSetting;
