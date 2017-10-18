var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RLSDB');

//----------------Change id type as Date once Post is working ---------------
var CellLoadingSchema = new mongoose.Schema({
    _id:Date,
    projectID:String,
    monthName:String,
    list:[{
      name:String,
      value:Number
    }]
});

var cellLoading = mongoose.model('cellloading', CellLoadingSchema);

exports = module.exports = cellLoading;
