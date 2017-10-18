import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AppBar from 'material-ui/AppBar';
import _ from 'lodash';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
// import AddCellContent from './AddCellContent.jsx';


// trackList[
//
// {
//   name:"digi";
//   value:20
// },
// {
//   name:"enu",
//   value:70
// }
// {
//   name:"something",
//   value:90
// }
//
// ]

// trackList[2].value

















const style = {
  marginRight: 20,
  marginTop:30
};

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

export default class AddCellConstruct extends React.Component{

  state={
    openDialogue:false,
    practiseName:'',
    roleName:'',
    locationName:'',
    bandName:'',
    txtValue:'',
    names:'',
    localTrackList:[],
    trackObj:{},
    value:'Select Role Name',
    items:[]
  }

	openDialogueBar=()=>{
		this.setState({openDialogue:true});
      	}
    componentDidMount=()=>{
    axios.get('/api/v1/trackSetting')
  	  .then(function (data) {
  	    console.log('AddCellConstruct connected to server');
  	    console.log(data);
  	    console.log(data.data.message);
  	     this.setState({localTrackList:data.data.message});
  	  }.bind(this))
  	  .catch(function (error) {
  	    console.log(error+"error in AddCellConstruct");
  	  });
      axios.get('/api/v1/roleSetting')
    	  .then(function (data) {
    	    console.log('AddCellConstruct connected to server');
    	    console.log(data);
    	    console.log(data.data.message);
    	    //  this.setState({localTrackList:data.data.message});
          data.data.message.forEach((data)=>{
            this.state.items.push(<MenuItem value={data.roleName} key={data._id} primaryText={data.roleName} />);
          })
          // this.state.item.push
    	  }.bind(this))
    	  .catch(function (error) {
    	    console.log(error+"error in AddCellConstruct");
    	  });
    }

	handleClose=()=>{
		this.setState({openDialogue:false});
	}

  handlePractiseNameChange=(e)=>{
    this.setState({practiseName:e.target.value});
  }
  handleRoleNameChange=(e)=>{
    this.setState({roleName:e.target.value});
  }

  handleLocationNameChange=(e)=>{
    this.setState({locationName:e.target.value});
  }

  handleBandNameChange=(e)=>{
    this.setState({bandName:e.target.value});
  }

  handleTrackNameChange=(e)=>{
  this.setState({names:e.target.name});
    this.setState({txtValue:e.target.value});

  }

  componetWillMount=()=>{
    console.log('cwm in CellConstruct');

  }
  handleAfterChange=()=>{
    console.log('txtbox name is'+this.state.names);
    console.log('txtbox value is'+ this.state.txtValue);
    let name=this.state.names;
    let values=this.state.txtValue;
    if(name!='' && values!=''){
    this.state.trackObj[name]=values;
  }
  }

  onAddingTitle=()=>{
    console.log('obj is');
    console.log(this.state.trackObj);
    let obj={
      _id:Date.now(),
      projectID:this.props.projectID,
      practiceName:this.state.practiseName,
      roleName:this.state.value,
      locationName:this.state.locationName,
      bandName:this.state.bandName,
      list:[]
    };
    Object.keys(this.state.trackObj).map((item) => {
      let objLocal={
        name:item,
        value:this.state.trackObj[item]
      };
      obj.list.push(objLocal);
    });

    console.log('array of object is');
     console.log(obj);
      this.props.CellConstructObj(obj);
      this.setState({openDialogue:false});
      this.setState({practiseName:'',roleName:'',locationName:'',bandName:''});
  }

  handleDrpDwnChange = (event, index, value) => this.setState({value});

	render(){

		 let titleBar=<AppBar title="Add Cell Construct" />;

		const actions = [
       <Divider style={{backgroundColor:'rgb(0, 188, 212)'}}/>,
      <FlatButton
        key="one"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="tw0"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onAddingTitle}
      />,
    ];

    let trackArr=[];
    this.state.localTrackList.forEach((data,index)=>{
      trackArr.push(<div key={index} >
        <TextField
          hintText="Enter Value"
          name={data.trackName}
          floatingLabelText={data.trackName}
          onChange={this.handleTrackNameChange}
          onBlur={this.handleAfterChange}
        />
      </div>
    );
    });

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
          open={this.state.openDialogue}
          modal={true}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
          <TextField
                hintText="Practise Name"
                floatingLabelText="Enter Practise Name"
                value={this.state.practiseName}
                onChange={this.handlePractiseNameChange}
            />
            <br />
            {/* <TextField
                  hintText="Role Name"
                  floatingLabelText="Enter Role Name"
                  value={this.state.roleName}
                  onChange={this.handleRoleNameChange}
              /> */}
              {/* <DropDownMenu maxHeight={300} value={this.state.value}
                    onChange={this.handleDrpDwnChange}
                    style={{width:'300px'}}
                    >
                      {this.state.items}
                    </DropDownMenu> */}
                    <SelectField
                        value={this.state.value}
                        onChange={this.handleDrpDwnChange}
                        floatingLabelText="Select Role from List"
                      >
                        {this.state.items}
                      </SelectField>
              <br />
              <TextField
                    hintText="Location Name"
                    floatingLabelText="Enter Location Name"
                    value={this.state.locationName}
                    onChange={this.handleLocationNameChange}
                />
                <br />
                <TextField
                      hintText="Band Name"
                      floatingLabelText="Enter Band Name"
                      value={this.state.bandName}
                      onChange={this.handleBandNameChange}
                  />
                  <br />
                  {trackArr}
        </Dialog>
        </div>

			);
	}
}
