var controller = {};
var roleSetting=require('./roleSettingModel');

controller.createRole = function(req, res) {

  console.log('Role api connected for post');

   roleSetting.create({_id:req.body._id,roleName:req.body.roleName},function(err,data){
          if(err) { console.log('server error in post'+err); }
          else{
           res.json({message:data});
          }
        });
  };

controller.getRole=function(req,res){

  console.log('Role api connected for get');

   roleSetting.find({}).exec(function(err,data){
          if(err) { console.log('server error in get'+err); }
          else{
           res.json({message:data});
          }
        });
};

controller.updateRole=function(req,res){
    console.log('Role api connected for update');
    console.log(req.body);
    var data=req.body._id;
    console.log(data);
    roleSetting.update({_id:req.body._id},req.body,function(err,data){
      if(err){console.log('server error in update'+ err);}
      else{
        res.json({message:data});
      }
    })
};

controller.removeRole = function(req,res){
     console.log('Role api connected for delete');
   console.log(req.param("_id"));
  // res.send(msg:'success');
  roleSetting.remove({_id:req.param("_id")},
  function(err, data){
            if(err)
            console.log('server error in remove'+ err);
            else
              res.json({message:data});
  });
}


exports = module.exports = controller;
