import React from 'react';
import ReactDOM from 'react-dom';
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
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

export default class EachNewSummaryTable extends React.Component{

	state={
		editStatus:false,
		cellName:this.props.cellName,
		resourceValue:this.props.resourceValue,
		cellComment:this.props.cellComment,
		openSnackBar:false
	}

	editTblRow=()=>{
		// e.preventDefault();
		this.setState({editStatus:true});
	}

	editCancel=()=>{
		this.setState({editStatus:false});
	}
	editSave=(e)=>{
		e.preventDefault();
		console.log("cell id from Add Constuct table"+this.props._id );
		var obj={
			_id:this.props._id,
      projectID:this.props.projectID,
			cellName:this.state.cellName,
			resourceValue:this.state.resourceValue,
      cellValue:this.state.resourceValue*20,
			cellComment:this.state.cellComment
		};
		console.log("inside  edit"+"obj detail"+ obj.cellName+" "+obj.cellValue );
		this.props.editDetail(obj,this.props._id);
		this.setState({editStatus:false});
		this.setState({cellName:'',resourceValue:'',cellComment:''});
	}

	removeTblRow=()=>{
		// var cellID=this.props.cellID;
		this.props.removeDetail(this.props._id);
		this.setState({openSnackBar:true});
	}

	handleCellNameChange=(e)=>{
		this.setState({cellName:e.target.value});
	}

	handleresourceValueChange=(e)=>{
		this.setState({resourceValue:e.target.value});
	}

	handleCellCommentChange=(e)=>{
		this.setState({cellComment:e.target.value});
	}

	handleClose=()=>{
		this.setState({openSnackBar:false});
	}

	render(){

		if(this.state.editStatus==false){
		return(

			<TableRow >
                <TableRowColumn >{this.props.cellName}</TableRowColumn>
                <TableRowColumn >{this.props.resourceValue}</TableRowColumn>
                <TableRowColumn >{this.props.cellValue}</TableRowColumn>
                <TableRowColumn >{this.props.cellComment}</TableRowColumn>
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


			)}
		else{
			return(
			<TableRow >
                <TableRowColumn >
                <TextField
                  disabled={true}
      hintText="Cell Name"
      floatingLabelText="Edit Cell Name"
      value={this.state.cellName}
      onChange={this.handleCellNameChange}
    />
                </TableRowColumn>
                <TableRowColumn >
                	<TextField
      hintText="Resource Count"
      floatingLabelText="Edit Resource Count"
      value={this.state.resourceValue}
      onChange={this.handleresourceValueChange}
    />
                </TableRowColumn>
                  <TableRowColumn >
                <TextField
                  disabled={true}
      hintText="Cell Value"
      floatingLabelText="Edit Cell Name"
      value={this.props.cellValue}
      disabled={true}
      // onChange={this.handleCellNameChange}
    />
                </TableRowColumn>

                <TableRowColumn >
                	<TextField
      hintText="Cell Comment"
      floatingLabelText="Edit Cell Comment"
      value={this.state.cellComment}
      onChange={this.handleCellCommentChange}
    />
      		 </TableRowColumn>
                <TableRowColumn >
                <IconButton touch={true} onTouchTap={this.editSave} >
     			 <ActionDone color={blue500}/>
   				 </IconButton>

                <IconButton touch={true} onTouchTap={this.editCancel} >
     			 <ContentClear color={red500}/>
   				 </IconButton>
    </TableRowColumn>
              </TableRow>);
		}
	}

}
