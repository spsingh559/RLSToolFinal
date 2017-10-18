import React from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
const style = {
  marginRight: 20,
  marginTop:30
};


export default class AddNewSummary extends React.Component{

	state={
		openDialogue:false,
		resourceValue:'',
		cellComments:'',
    value:'',
    items:[]
	}

	openDialogueBar=()=>{
		this.setState({openDialogue:true});
    $.ajax({
      url:'http://localhost:3000/api/v1/trackSetting',
      type:'GET',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add Track for get');
         console.log(data);
          // this.state.items.push(<MenuItem value="1" key='one' primaryText="Select Track" />);
          data.message.forEach((data,index)=>{

            this.state.items.push(<MenuItem value={data.trackName} key={index} primaryText={data.trackName} />);
          });
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add track');
      }.bind(this)
    });
    console.log("Drop down for track in CellSummary");
	}

	handleClose=()=>{
		this.setState({openDialogue:false});
	}

	// handleCellNameChange=(e)=>{
	// 	this.setState({cellNames:e.target.value})
	// }

	handleresourceValueChange=(e)=>{
		this.setState({resourceValue:e.target.value});
	}

	handleCellCommentChange=(e)=>{
		this.setState({cellComments:e.target.value});
	}

	handleConstructSubmit=(e)=>{
		 e.preventDefault();
     // this.setState({cellID:this.state.cellID+1})
     var _id=Date.now();
		var obj={
			_id:_id,
      projectID:this.props.projectID,
			resourceValue:this.state.resourceValue,
			cellName:this.state.value,
      cellValue:this.state.resourceValue*20,
			cellComment:this.state.cellComments
		};
		console.log("object Detail in Add Construct"+ obj.cellValue+obj.cellName+obj.cellComment+obj._id);
		this.props.handleConstructSubmitData(obj);
		this.setState({resourceValue:'',cellNames:'',cellComments:'',openDialogue:false});

	}

  handleDrpDwnChange = (event, index, value) => this.setState({value});

	render(){

    console.log('project id in Add new summary');
    console.log(this.props.projectID);
  const actions=  [
    <Divider key ="one" style={{backgroundColor:'rgb(0, 188, 212)'}}/>,
    <FlatButton
      key="two"
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
    />,
    <FlatButton
      key="three"
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleConstructSubmit}
    />,
  ];


      let titleBar=<AppBar
    title="Add Construct Cell"
  />;
		return(
			<div>
			<FloatingActionButton style={style}
			onTouchTap={this.openDialogueBar}
			mini={true}>
     		 <ContentAdd />
   		 </FloatingActionButton>
        <Dialog
          title={titleBar}
          actions={actions}
          modal={true}
          open={this.state.openDialogue}
          onRequestClose={this.handleClose}
        >
          <div>
         {/* <TextField
                         hintText="Track Name"
                         floatingLabelText="Enter Track Name"
                         value={this.state.cellNames}
                         onChange={this.handleCellNameChange}
                     />*/}
            {/* <DropDownMenu maxHeight={300} value={this.state.value}
            onChange={this.handleDrpDwnChange}
            style={{width:'580px'}}
            floatingLabelText="Select Track"
            >
        {this.state.items}
      </DropDownMenu> */}

      <SelectField
          value={this.state.value}
          onChange={this.handleDrpDwnChange}
          floatingLabelText="Select Track"
        >
          {this.state.items}
        </SelectField>

            <br />
            <TextField
              key="1"
               hintText="Enter No. of Resource for thid Track "
               floatingLabelText="Resource Count"
               value={this.state.resourceValue}
               onChange={this.handleresourceValueChange}
               fullWidth={true}
             />
             <br />
             <TextField
               key="2"
               hintText="Comment"
               floatingLabelText="Enter Comment"
               value={this.state.cellComments}
               onChange={this.handleCellCommentChange}
               fullWidth={true}
             />
             <br />
           </div>
        </Dialog>
			</div>
			)
	}
}
