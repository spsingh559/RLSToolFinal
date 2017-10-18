var express = require('express');
var router = express.Router();

/* GET home page. */
 router.get('/', function(req, res, next) {
//   res.render('index');
res.render('index');

});

// router.post('/api/v1/createDB',function(req,res){
//
// 	console.log('createDB in server');
// 	console.log(req.body.projectID);
// 	res.send("Connnected to server");
// });



module.exports = router;
