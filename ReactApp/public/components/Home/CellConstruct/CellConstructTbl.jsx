import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import EachNewCellConstructData from './EachNewCellConstructData.jsx';

export default class CellConstructTbl extends React.Component {

  state={
    count:0,
    showCheckboxes:false,
    selectable:false
  }

  editEachData=(obj)=>{
    this.props.editEachData(obj);
  }
  removeTblRow=(_id)=>{
    this.props.removeTblRow(_id);
  }
  render(){
    console.log('data in CellConstructTbl');
    console.log(this.props.cellConstructData);

    // console.log(this.props.cellConstructData);
  		// if(this.props.cellConstructData.length!=0){
  		var projectData = this.props.cellConstructData.map(function(cellConstructData,index) {
  	      return (
  	      	// <TableRow key={cellConstructData._id}>
  	        <EachNewCellConstructData
            key={cellConstructData._id}
            practiceName={cellConstructData.practiceName}
  	        roleName={cellConstructData.roleName}
  	        locationName={cellConstructData.locationName}
  	        bandName={cellConstructData.bandName}
            _id={cellConstructData._id}
            list={cellConstructData.list}
            editEachData={this.editEachData}
            removeTblRow={this.removeTblRow}
  	        />
  	        //  </TableRow>

  	      );
  	    }.bind(this));
      // let trackHeader=[];
      // for(let i=0; i<this.props.trackList.length;i++){
      //     trackHeader.push( <TableHeaderColumn key={i}>{this.props.trackList[i]}</TableHeaderColumn>);
      // }

      let i=0;
      let trackHeader=[];
      this.props.cellConstructData.map((data)=>{
        if(i==0){
          data.list.map((data)=>{
              trackHeader.push( <TableHeaderColumn key={i}>{data.name}</TableHeaderColumn>);
          })
        }
        i++;
      });

      if(this.props.cellConstructData.length!=0){
  		return(
        <Table
  			selectable={this.state.selectable}
  			>
           <TableHeader adjustForCheckbox={this.state.showCheckboxes}
               displaySelectAll={this.state.showCheckboxes}>
               <TableRow>
               <TableHeaderColumn >Practise</TableHeaderColumn>
                <TableHeaderColumn >Role</TableHeaderColumn>
                 <TableHeaderColumn >Band</TableHeaderColumn>
                  <TableHeaderColumn >Location</TableHeaderColumn>
                  {trackHeader}
                  <TableHeaderColumn >Action</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
    				 <TableBody   displayRowCheckbox={this.state.showCheckboxes}>
    				  {projectData}
              {/* {this.props.cellConstructData.map( (row, index) => (
                  row.list.map((row, index)=>(
                    <TableRow key={index}>
                      {/* <TableRowColumn>{index}</TableRowColumn> */}
                      {/* <TableRowColumn>{row.name}</TableRowColumn>
                      <TableRowColumn>{row.value}</TableRowColumn>
                    </TableRow>
                  )) */}

              {/* ))} */}
  				</TableBody>
  				</Table>
      );
    }else{
      return null;
    }
  }
}
