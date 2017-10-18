import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddroleName from './AddroleName.jsx';
import Displayrole from './Displayrole.jsx';
export default class Addrole extends React.Component{

  state={
    roleData:[]
  };

  componentWillMount=()=>{
    $.ajax({
      url:'http://localhost:3000/api/v1/roleSetting',
      type:'GET',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add role for get');
         console.log(data);
           this.setState({roleData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add role');
      }.bind(this)
    });
    console.log("CWM is called");
  }

  roleList=(roleName,_id)=>{

var currentState=this.state.roleData;
    console.log('inside Add role Component');
  //  console.log('name ' + roleName + 'id is '+ id);
    var obj={
      _id:_id,
      roleName:roleName
    };

    $.ajax({
      url:'http://localhost:3000/api/v1/roleSetting',
      type:'POST',
      data:obj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add role');
         console.log(data);
         var newData=[data.message].concat(currentState);
           this.setState({roleData:newData});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add role');
         this.setState({roleData:currentState});
      }.bind(this)
    });

    // var currentState=this.state.roleData;
    // var newData=[obj].concat(currentState);
    // console.log('new data is');
    // console.log(newData);
    //
    // console.log("new object created in Add role");
    // console.log(this.state.roleData);

  }

  chipDltRequest=(_id)=>{
      var dataCurrentState=this.state.roleData;
    $.ajax({
      url:'http://localhost:3000/api/v1/roleSetting/'+_id,
      type:'DELETE',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add role for remove');
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

       this.setState({roleData:dataCurrentState});
    // /       this.setState({roleData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add role for remove');
      }.bind(this)
    });

  }

  editroleName=(obj,_id)=>{
    console.log("obj in Addrole");
    console.log(obj);
    console.log(_id);
  var dataCurrentState=this.state.roleData;
    $.ajax({
      url:'http://localhost:3000/api/v1/roleSetting',
      type:'PUT',
      data:obj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add role for put');
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
      this.setState({roleData:dataCurrentState});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add role for put');
          this.setState({roleData:dataCurrentState});
      }.bind(this)
    });


  }

  render(){
    return(
      <Card style={{width:'300px'}}>
    <CardHeader
      title="role List"
      subtitle="manipulate role List"
      actAsExpander={true}
      showExpandableButton={true}
    />
    {/* <CardActions>
      <FlatButton label="Open" />
      <FlatButton label="View" />
    </CardActions> */}
    <CardText expandable={true}>
       <AddroleName roleList={this.roleList}
                    id={this.state.indexId}
        />
       <div style={{marginTop:'50px'}}>
       <Displayrole roleData={this.state.roleData}
         chipDltRequest={this.chipDltRequest}
         editroleName={this.editroleName}
        />
     </div>
    </CardText>
  </Card>
    );
  }
}
