var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RLSDB');

var CellConstructSchema = new mongoose.Schema({
    _id:Date,
    projectID:String,
    practiceName:String,
    roleName:String,
    locationName:String,
    bandName:String,
    list:[{
      name:String,
      value:Number
    }]
});

var cellConstruct = mongoose.model('cellconstruct', CellConstructSchema);

exports = module.exports = cellConstruct;
