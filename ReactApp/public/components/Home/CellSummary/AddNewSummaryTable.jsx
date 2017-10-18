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
//const ID;
import EachNewSummaryTable from './EachNewSummaryTable.jsx';

export default class AddNewSummaryTable extends React.Component{

	state={
		selectable: false,
		showCheckboxes: false,
		stripedRows: true,
		editStatus:false,
		cellNames:'',
		cellValues:'',
		cellComments:''
	}

  editDetails=(obj,_id)=>{
    console.log("obj in Add Construct"+obj._id);
    this.props.editDetailTblRow(obj,_id);
  }

  removeDetails=(_id)=>{
  	this.props.removeDetailTblRow(_id);
  }

	render(){
	console.log(this.props.cellData);
		if(this.props.cellData.length!=0){
		var projectData = this.props.cellData.map(function(cellData,index) {
	      return (
	      	// <div key={cellData._id}>
	        <EachNewSummaryTable
          key={cellData._id}
	        cellName={cellData.cellName}
          resourceValue={cellData.resourceValue}
	        cellValue={cellData.cellValue}
	        cellComment={cellData.cellComment}
          _id={cellData._id}
          projectID={cellData.projectID}
          editDetail={this.editDetails}
          removeDetail={this.removeDetails}
	        />
	        //  </div>

	      );
	    }.bind(this));


		return(
			<Table
			selectable={this.state.selectable}
      style={{height:'auto'}}
			>
   				 <TableHeader adjustForCheckbox={this.state.showCheckboxes}
             displaySelectAll={this.state.showCheckboxes}>
					<TableRow >
						<TableHeaderColumn >Cell Name</TableHeaderColumn>
            <TableHeaderColumn >Resource Count</TableHeaderColumn>
						<TableHeaderColumn>Cell Value</TableHeaderColumn>
       					<TableHeaderColumn>Comment</TableHeaderColumn>
       					<TableHeaderColumn>Action</TableHeaderColumn>
      				</TableRow>
   				 </TableHeader>
  				 <TableBody displayRowCheckbox={this.state.showCheckboxes}>
  				  {projectData}

				</TableBody>
				</Table>
			);}
		else{
			return null;
		}
	}
}
