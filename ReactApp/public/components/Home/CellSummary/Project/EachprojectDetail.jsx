import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Grid,Row } from 'react-bootstrap';
import StepperComponent from './StepperComponent.jsx';
import TextField from 'material-ui/TextField';
export default class EachProjectDetail extends React.Component {

  state={
    editStatus:false,
    pName:this.props.projectName

  }

  handleProjectNameChange=(e)=>{
    this.setState({pName:e.target.value});
  }

  removeProjectDetail=()=>{
    this.props.removeProjectDetail(this.props._id,this.props.projectID);
  }
  editProjectDetail=()=>{
    this.setState({editStatus:true});
  }

  editSave=()=>{
    var obj={
      _id:this.props._id,
      projectName:this.state.pName,
      projectID:this.props.projectID
    };
    this.props.saveEditProjectDetail(obj,this.props._id);
    this.setState({editStatus:false});
  }

	render(){
    if(this.state.editStatus==false){

		return(
			<div style={{marginTop:'20px'}}>
        <Grid>
          <Row>
        <Card>
    <CardHeader
      title={this.props.projectName}
      subtitle={ this.props.projectID}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <FlatButton label="Edit" onTouchTap={this.editProjectDetail} />
      <FlatButton label="Remove" onTouchTap={this.removeProjectDetail}/>
    </CardActions>
    <CardText expandable={true}>
     <StepperComponent projectID={this.props.projectID}/>
    </CardText>
  </Card>
  </Row>
  </Grid>
			</div>
			)}
    else{
      return(
      <div style={{marginTop:'20px'}}>
        <Grid>
  <Row>
        <Card>
    <CardHeader
      title="Edit Project Name"
      subtitle={ this.props.projectID}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText>
     <TextField
      hintText="Project Name"
      floatingLabelText="Edit Project Name"
      value={this.state.pName}
      onChange={this.handleProjectNameChange}
    />
    </CardText>
    <CardActions>
      <FlatButton label="Save" onTouchTap={this.editSave}/>
      <FlatButton label="Cancel" />
    </CardActions>
  </Card>
  </Row>
  </Grid>

      </div>
    )};
	}
}
