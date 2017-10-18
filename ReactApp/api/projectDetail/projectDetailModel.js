var express = require('express');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://mongoservice:iR4bvbwdVKPStW3rK5APp5OhskAfr4oxm8HXqwn2AsREclTgd6nvIC86EtiiHFty3EtCoQQYAdeWj8I0Zb08rA==@mongoservice.documents.azure.com:10255/?ssl=true&replicaSet=globaldb');
// mongoose.connect('mongodb://mongoservice:iR4bvbwdVKPStW3rK5APp5OhskAfr4oxm8HXqwn2AsREclTgd6nvIC86EtiiHFty3EtCoQQYAdeWj8I0Zb08rA==@mongoservice.documents.azure.com:10255/?ssl=true&replicaSet=globaldb');
mongoose.connect('mongodb://localhost:27017/RLSDB');

var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
    _id:Date,
    projectID:String,
    projectName: String
});

var projectDetail = mongoose.model('projectDetails', ProjectSchema);

exports = module.exports = projectDetail;
