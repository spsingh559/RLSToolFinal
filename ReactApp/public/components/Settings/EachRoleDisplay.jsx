import React from 'react';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class EachRoleDisplay extends React.Component{

  state={
    roleEditStatus:false,
    roleName:this.props.roleName
  }

  handleRoleNameChange=(e)=>{
    this.setState({roleName:e.target.value});
  }
  handleRequestDelete=()=>{
  this.props.chipDltRequest(this.props._id);
  };

  handleTouchTap=()=>{
    this.setState({roleEditStatus:true});
  }

  submitEditRoleName=(e)=>{
  //  console.log('role name is'+this.state.roleNames);
    e.preventDefault();
    let obj={
      _id:this.props._id,
      roleName:this.state.roleName
    };
     console.log(obj);
     console.log(this.props._id);
     this.setState({roleEditStatus:false});
     this.props.editRoleName(obj,this.props._id);

  }

  cancelEditRoleName=()=>{
    this.setState({roleEditStatus:false});
  }
  render(){

    if(this.state.roleEditStatus==true){
      return(
        <div>
        <TextField
            hintText="Role Name"
            floatingLabelText="Edit Role Name"
            value={this.state.roleName}
            onChange={this.handleRoleNameChange}
        />
        <FlatButton label="Submit" primary={true} onTouchTap={this.submitEditRoleName} />
          <FlatButton label="Cancel" primary={true} onTouchTap={this.cancelEditRoleName} />
      </div>
      );
    }else{
    return(
       <div style={styles.wrapper}>
      <Chip
          onRequestDelete={this.handleRequestDelete}
          onTouchTap={this.handleTouchTap}
          style={styles.chip}
        >
        {/* <h4> Shyam </h4> */}
        {this.props.roleName}
      </Chip>
    </div>
    );
  }
  }
}
