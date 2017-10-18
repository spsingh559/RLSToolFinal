var controller = {};
 var cellLoading=require('./cellLoadingModel.js');
//
controller.postLoadData = function(req, res) {

  console.log('cellLoading post api connected for post');

  // console.log(req.body);

var data = req.body;
// console.log('cellLoading Object into Server');
// console.log(data);
// console.log('tracklist is');
// console.log(data.trackList[0].name);
 // var cellConstruct1 = new cellConstruct(data);

 // console.log(cellConstruct1.trackList);

console.log(' Operation Save into DB');
   cellLoading.create(req.body,function(err,data){
          if(err) {
            res.send(err);
           }
          else{
            console.log('data after save into db');
            console.log(data);
           res.send({message:data});
          }
        });
   };

controller.getCellLoading=function(req,res){

  console.log('CellLoading api connected for get');

   cellLoading.find({projectID:req.params.projectID}).exec(function(err,data){
          if(err) { console.log('server error in get'+err); }
          else{
           res.json({message:data});
          }
        });
};

 controller.deleteData = function(req,res){
     console.log('CellLoading api connected for delete');
   console.log(req.params._id);
  // res.send(msg:'success');
  cellLoading.remove({_id:req.params._id},
  function(err, data){
            if(err)
            console.log('server error in remove for delete'+ err);
            else
              res.json({message:data});
  });
}
//
// controller.updateCellSummary=function(req,res){
//     console.log('CellSummary api connected for update');
//     console.log(req.body);
//     var data=req.body._id;
//     console.log(data);
//     CellSummary.update({_id:req.body._id},req.body,function(err,data){
//       if(err){console.log('server error in update of CellSummary'+ err);}
//       else{
//         res.json({message:data});
//       }
//     })
// };
//
// controller.getIDData = function(req,res){
//      console.log('cellLoading api connected for get data with id');
//    console.log(req.params._id);
//   // res.send(msg:'success');
//   cellLoading.find({_id:req.params._id},
//   function(err, data){
//             if(err)
//             console.log('server error in remove'+ err);
//             else
//               res.json({message:data});
//   });
// }


exports = module.exports = controller;
