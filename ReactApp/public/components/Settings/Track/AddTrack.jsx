import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddTrackName from './AddTrackName.jsx';
import DisplayTrack from './DisplayTrack.jsx';
export default class AddTrack extends React.Component{

  state={
    trackData:[]
  };

  componentWillMount=()=>{
    $.ajax({
      url:'http://localhost:3000/api/v1/trackSetting',
      type:'GET',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add Track for get');
         console.log(data);
           this.setState({trackData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add track');
      }.bind(this)
    });
    console.log("CWM is called");
  }

  trackList=(trackName,_id)=>{
    console.log('ins_ide Add Track Component');
    var currentState=this.state.trackData;
    console.log('name ' + trackName + '_id is '+ _id);
    var obj={
      _id:_id,
      trackName:trackName
    };

    $.ajax({
      url:'http://localhost:3000/api/v1/trackSetting',
      type:'POST',
      data:obj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add track');
         console.log(data);
         var newData=[data.message].concat(currentState);
           this.setState({trackData:newData});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add track');
         this.setState({trackData:currentState});
      }.bind(this)
    });
    // var currentState=this.state.trackData;
    // var newData=[obj].concat(currentState);
    // console.log('new data is');
    // console.log(newData);
    // this.setState({trackData:newData});
    // console.log("new object created in Add track");
    // console.log(this.state.trackData);

  }

  chipDltRequest=(_id)=>{
    // var dataCurrentState=this.state.trackData;
		// 	var index;
    // for (var i = 0; i < dataCurrentState.length; i++) {
    //   if(dataCurrentState[i]._id==_id){
    //    // index=obj.cell_id;
    //    var editData=dataCurrentState.splice(i,1);
    //    editData=null;
    //     break;
    //   }
    // };
    //
    // this.setState({trackData:dataCurrentState});
    var dataCurrentState=this.state.trackData;
  $.ajax({
    url:'http://localhost:3000/api/v1/trackSetting/'+_id,
    type:'DELETE',
    contetntType:'application/json',
    success: function(data){
       console.log('server connected from Add track for remove');
       console.log(data);
       var index;
     for (var i = 0; i < dataCurrentState.length; i++) {
       if(dataCurrentState[i]._id==_id){
        // index=obj.cellID;
        var editData=dataCurrentState.splice(i,1);
        editData=null;
         break;
       }
     };

     this.setState({trackData:dataCurrentState});
  // /       this.setState({trackData:data.message});
    }.bind(this),
    error:function(err){
      console.log('server not connected from Add track for remove');
    }.bind(this)
  });
  }

  editTrackName=(obj,_id)=>{
    console.log("obj in Addtrack");
    console.log(obj);
    console.log(_id);
  var dataCurrentState=this.state.trackData;
    $.ajax({
      url:'http://localhost:3000/api/v1/trackSetting',
      type:'PUT',
      data:obj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add track for put');
         console.log(data.message);
      var index;
      for (var i = 0; i < dataCurrentState.length; i++) {
        if(dataCurrentState[i]._id==_id){
         // index=obj.cellID;
         var editData=dataCurrentState.splice(i,1,obj);
         editData=null;
          break;
        }
      };
      console.log("data after edit");
      console.log(dataCurrentState);
      this.setState({trackData:dataCurrentState});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add track for put');
          this.setState({trackData:dataCurrentState});
      }.bind(this)
    });
  //   console.log("obj in AddTrack");
  //   console.log(obj);
  //   console.log(_id);
  //   var dataCurrentState=this.state.trackData;
  //   var index;
  // for (var i = 0; i < dataCurrentState.length; i++) {
  //   if(dataCurrentState[i]._id==_id){
  //    // index=obj.cell_id;
  //    var editData=dataCurrentState.splice(i,1,obj);
  //    editData=null;
  //     break;
  //   }
  // };
  // console.log("data after edit");
  // console.log(dataCurrentState);
  // this.setState({trackData:dataCurrentState});

  }

  render(){
    return(
      <Card style={{width:'300px'}}>
    <CardHeader
      title="Track List"
      subtitle="manipulate Track List"
      actAsExpander={true}
      showExpandableButton={true}
    />
    {/* <CardActions>
      <FlatButton label="Open" />
      <FlatButton label="View" />
    </CardActions> */}
    <CardText expandable={true}>
       <AddTrackName trackList={this.trackList}
        />
       <div style={{marginTop:'50px'}}>
       <DisplayTrack trackData={this.state.trackData}
         chipDltRequest={this.chipDltRequest}
         editTrackName={this.editTrackName}
        />
     </div>
    </CardText>
  </Card>
    );
  }
}
