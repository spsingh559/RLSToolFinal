import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
export default class AddRoleName extends React.Component{

  state={
    roleName:'',
    txtFormStatus:false
  }

  handleRoleNameChange=(e)=>{
    this.setState({roleName:e.target.value});
  }

  submitRoleName=(e)=>{
    //alert(this.state.trackName);
      e.preventDefault();
  //  this.setState({id:this.state.id+1});
    console.log('obj in Add Role Name');
  //  console.log('name ' + this.state.roleName + 'id is '+ this.state.id);
      var _id=Date.now();
      console.log(_id);
     this.props.roleList(this.state.roleName,_id);
     this.setState({txtFormStatus:false,roleName:''});
  }

  handleOpen=()=>{
    this.setState({txtFormStatus:true});
  }

  render(){
    var txtForm =this.state.txtFormStatus?[<TextField
        key ="one"
        hintText="Role Name"
        floatingLabelText="Enter Role Name"
        value={this.state.roleName}
        onChange={this.handleRoleNameChange}
    />,
    <FlatButton key="two" label="Submit" primary={true} onTouchTap={this.submitRoleName} />]:null
    return(
      <div>
        <RaisedButton label="Add Role"
        primary={true}
        onTouchTap={this.handleOpen}
         />
         {txtForm}
      </div>
    )
  }
}
