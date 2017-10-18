import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
export default class AddTrackName extends React.Component{

  state={
    trackName:'',
    txtFormStatus:false
  }

  handleTrackNameChange=(e)=>{
    this.setState({trackName:e.target.value});
  }

  submitTrackName=(e)=>{
    //alert(this.state.trackName);
      e.preventDefault();
    console.log('obj in Add Track Name');
    //console.log('name ' + this.state.trackName + '_id is '+ this.state._id);
    var _id=Date.now();
     this.props.trackList(this.state.trackName,_id);
     this.setState({txtFormStatus:false,trackName:''});
  }

  handleOpen=()=>{
    this.setState({txtFormStatus:true});
  }

  render(){
    var txtForm =this.state.txtFormStatus?[<TextField
        key="one"
        hintText="Track Name"
        floatingLabelText="Enter Track Name"
        value={this.state.trackName}
        onChange={this.handleTrackNameChange}
    />,
    <FlatButton key="two" label="Submit" primary={true} onTouchTap={this.submitTrackName} />]:null
    return(
      <div>
        <RaisedButton label="Add Track"
        primary={true}
        onTouchTap={this.handleOpen}
         />
         {txtForm}
      </div>
    )
  }
}
