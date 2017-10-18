var controller = {};
var trackSetting=require('./trackSettingModel');

controller.createtrack = function(req, res) {

  console.log('track api connected for post');

   trackSetting.create({_id:req.body._id,trackName:req.body.trackName},function(err,data){
          if(err) { console.log('server error in post'+err); }
          else{
           res.json({message:data});
          }
        });
  };

controller.gettrack=function(req,res){

  console.log('track api connected for get');

   trackSetting.find({}).exec(function(err,data){
          if(err) { console.log('server error in get'+err); }
          else{
           res.json({message:data});
          }
        });
};

controller.updatetrack=function(req,res){
    console.log('track api connected for update');
    console.log(req.body);
    var data=req.body._id;
    console.log(data);
    trackSetting.update({_id:req.body._id},req.body,function(err,data){
      if(err){console.log('server error in update'+ err);}
      else{
        res.json({message:data});
      }
    })
};

controller.removetrack = function(req,res){
     console.log('track api connected for delete');
   console.log(req.param("_id"));
  // res.send(msg:'success');
  trackSetting.remove({_id:req.param("_id")},
  function(err, data){
            if(err)
            console.log('server error in remove'+ err);
            else
              res.json({message:data});
  });
}


exports = module.exports = controller;
