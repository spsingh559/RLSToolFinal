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

export default class EachTrackDisplay extends React.Component{

  state={
    trackEditStatus:false,
    trackName:this.props.trackName
  }

  handleTrackNameChange=(e)=>{
    this.setState({trackName:e.target.value});
  }
  handleRequestDelete=()=>{
  this.props.chipDltRequest(this.props._id);
  };

  handleTouchTap=()=>{
    this.setState({trackEditStatus:true});
  }

  submitEditTrackName=(e)=>{
  //  console.log('role name is'+this.state.roleNames);
    e.preventDefault();
    let obj={
      _id:this.props._id,
      trackName:this.state.trackName
    };
    this.setState({trackEditStatus:false});
     console.log(obj);
     this.props.editTrackName(obj,this.props._id);

  }

  cancelEditTrackName=()=>{
    this.setState({trackEditStatus:false});
  }
  render(){

    if(this.state.trackEditStatus==true){
      return(
        <div>
        <TextField
            hintText="Track Name"
            floatingLabelText="Edit Track Name"
            value={this.state.trackName}
            onChange={this.handleTrackNameChange}
        />
        <FlatButton label="Submit" primary={true} onTouchTap={this.submitEditTrackName} />
          <FlatButton label="Cancel" primary={true} onTouchTap={this.cancelEditTrackName} />
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
          {this.props.trackName}
      </Chip>
    </div>
    );
  }
  }
}
