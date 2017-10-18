import React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

export default class EachNewCellConstructData extends React.Component{

  state={
    editStatus:false,
    practiseName:this.props.practiseName,
    roleName:this.props.roleName,
    locationName:this.props.locationName,
    bandName:this.props.bandName,
    openDialogue:false,
    names:'',
    txtValue:'',
    trackObj:{},
    obj:{practiseName:"",roleName:"",locationName:"",bandName:"",list:[]}
  }

  handlePractiseNameChange=(e)=>{
    this.setState({practiseName:e.target.value});
  }
  handleRoleNameChange=(e)=>{
    this.setState({roleName:e.target.value});
  }
  handleBandNameChange=(e)=>{
    this.setState({bandName:e.target.value});
  }
  handleLocationNameChange=(e)=>{
    this.setState({locationName:e.target.value});
  }

  editTblRow=()=>{
    this.setState({editStatus:true,openDialogue:true});
  }
  handleClose=()=>{
    this.setState({openDialogue:false,editStatus:false});
  }
  handleTrackChange=(e)=>{
    console.log(e.target.name);
    this.setState({names:e.target.name});
  this.setState({txtValue:e.target.value});
    console.log(this.state.names);
  }

  handleBlur=()=>{
    console.log('txtbox name is'+this.state.names);
    console.log('txtbox value is'+ this.state.txtValue);
    let name=this.state.names;
    let values=this.state.txtValue;

    this.state.trackObj[name]=values;
  }
  onSubmitEdit=()=>{
    console.log('obj is');
    console.log(this.state.trackObj);
    Object.keys(this.state.trackObj).map((item) => {
      let objLocal={
        name:item,
        values:this.state.trackObj[item]
      };
      this.state.obj.list.push(objLocal);
      // console.log("item", )
    });

    console.log('array of object is');
    console.log(this.state.obj.trackList);

    this.state.obj.practiseName=this.state.practiseName;
    this.state.obj.roleName=this.state.roleName;
    this.state.obj.locationName=this.state.locationName;
    this.state.obj.bandName=this.state.bandName;
    this.state.obj._id=this.props._id;
    console.log('object send from EachNewCellConstructData');
    console.log(this.state.obj);
    let newObj=this.state.obj;

    //  this.setState({trackObj:{}});
    this.props.editEachData(newObj);
    newObj=null;
    this.setState({openDialogue:false,editStatus:false});
    // this.setState({practiseName:'',roleName:'',locationName:'',bandName:''});
  }

removeTblRow=()=>{
  this.props.removeTblRow(this.props._id,);
}

  render(){
    if(this.state.editStatus==false){
      let items=[];
      console.log('list in EachNewCellConstructData');
      console.log(this.props.list);
    this.props.list.forEach(function(data,i){
      console.log(data.value);
      items.push(  <TableRowColumn key={i} >{data.value}</TableRowColumn>);
    })

    return(
      <TableRow>
        <TableRowColumn  >{this.props.practiceName}</TableRowColumn>
        <TableRowColumn >{this.props.roleName}</TableRowColumn>
        <TableRowColumn >{this.props.bandName}</TableRowColumn>
        <TableRowColumn >{this.props.locationName}</TableRowColumn>
        {items}
        <TableRowColumn >
          <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
            <MenuItem primaryText="Edit" onTouchTap={this.editTblRow}/>
            <MenuItem primaryText="Remove" onTouchTap={this.removeTblRow}/>
          </IconMenu>
        </TableRowColumn>
      </TableRow>
      );
    }else {

      let items=[];
      let me =this;
      // this.state.txtValue=
      this.props.list.map(function(data,i){
        items.push( <div key={i}>
          <TextField
        key={i}
        hintText={data.name}
        floatingLabelText={'Edit '+data.name}
        name={data.name}
        onChange={me.handleTrackChange}
        onBlur={me.handleBlur}
      />
    <br />
  </div>
      )
    });
    //   let items=[];
    // this.props.trackList.map(function(data,i){
    //   items.push(  <TableRowColumn key={i} style={{width:'auto'}}>{data.values}</TableRowColumn>);
    // });
    let titleBar=<AppBar title="Edit Cell Construct" />;

   const actions = [
     <FlatButton
       key="one"
       label="Cancel"
       primary={true}
       onTouchTap={this.handleClose}
     />,
     <FlatButton
       key="tw0"
       label="Save"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.onSubmitEdit}
     />
   ];
      return(
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
          floatingLabelText="Edit Practise Name"
          value={this.state.practiseName}
          onChange={this.handlePractiseNameChange}
        />
        <br />
          <TextField
          hintText="Role Name"
          floatingLabelText="Edit Role Name"
          value={this.state.roleName}
          onChange={this.handleRoleNameChange}
        />
          <br />
            <TextField
            hintText="Band Name"
            floatingLabelText="Edit bandName Name"
            value={this.state.bandName}
            onChange={this.handleBandNameChange}
          />
          <br />
        <TextField
        hintText="Location Name"
        floatingLabelText="Edit Location Name"
        value={this.state.locationName}
        onChange={this.handleLocationNameChange}
      />
      {items}
</Dialog>

        );
    }
  }
}
