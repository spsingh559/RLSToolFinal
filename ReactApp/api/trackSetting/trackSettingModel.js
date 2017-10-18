var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RLSDB');

var Schema = mongoose.Schema;
var trackSchema = new Schema({
    _id:Date,
    trackName: String
});

var trackSetting = mongoose.model('tracksettings', trackSchema);

exports = module.exports = trackSetting;
