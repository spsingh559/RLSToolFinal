var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RLSDB');

var Schema = mongoose.Schema;
var CellSummarySchema = new Schema({
    _id:Date,
  projectID:String,
  resourceValue:Number,
  cellValue:Number,
	cellName:String,
	cellComment:String
});

var cellSummary = mongoose.model('cellSummary', CellSummarySchema);

exports = module.exports = cellSummary;
