var controller = {};
 var projectDetail=require('./projectDetailModel.js');
 var cellSummaryModel = require('../CellSummary/cellSummaryModel.js');
 var cellLoadingModel=require('../CellLoading/cellLoadingModel.js');
 var cellConstructModel=require('../CellConstruct/cellConstructModel.js');
//
controller.createProject	  = function(req, res) {

  console.log('Project Detail api connected for post');

   projectDetail.create({_id:req.body._id,projectID:req.body.projectID,projectName:req.body.projectName},function(err,data){
          if(err) { console.log('server error in post'+err); }
          else{
           res.json({message:data});
          }
        });
  };
//
controller.getProject=function(req,res){

  console.log('getProject api connected for get');

   projectDetail.find({}).exec(function(err,data){
          if(err) { console.log('server error in get'+err); }
          else{
           res.json({message:data});
          }
        });
};

controller.updateProject=function(req,res){
    console.log('Project api connected for update');
    console.log(req.body);
    var data=req.body._id;
    console.log(data);
    projectDetail.update({_id:req.body._id},req.body,function(err,data){
      if(err){console.log('server error in update'+ err);}
      else{
        res.json({message:data});
      }
    })
};

controller.removePoject = function(req,res){
     console.log('Project api connected for delete');
  //  console.log(req.param("_id"));
  // res.send(msg:'success');
  console.log(req.params.projectID);
  // console.log(req.params.objToServer.objToServer.projectID);
  projectDetail.remove({projectID:req.params.projectID},function(err, data){
            if(err)
            console.log('server error in remove'+ err);
            else
            cellSummaryModel.remove({projectID:req.params.projectID},function(err,data){
              if(err)
              console.log('error in cell summary deletion in project detail');
              else {
                console.log('success deletion');
              }
            })
            cellLoadingModel.remove({projectID:req.params.projectID},function(err,data){
              if(err)
              console.log('error in cell summary deletion in project detail');
              else {
                console.log('success deletion');
              }
            })
            cellConstructModel.remove({projectID:req.params.projectID},function(err,data){
              if(err)
              console.log('error in cell summary deletion in project detail');
              else {
                console.log('success deletion');
              }
            })
              res.json({message:data});
  });
}


exports = module.exports = controller;
