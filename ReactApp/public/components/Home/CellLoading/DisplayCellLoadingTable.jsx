import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import EachNewCellLoadingTbl from './EachNewCellLoadingTbl.jsx';

export default class DisplayCellLoadingTable extends React.Component {

  state={
    count:0,
    selectable:false,
    showCheckboxes:false,
    stripedRows: true,
    showRowHover: true,
  }

  removeRow=(_id)=>{
    this.props.removeRow(_id);
  }
  sendEditData=(obj,_id)=>{
    this.props.sendEditData(obj,_id);
  }
  render(){
    let projectData = this.props.data.map((data)=>{
      return(
        // <div key={data._id}>
      <EachNewCellLoadingTbl
      key={data._id}
      monthName={data.monthName}
      list={data.list}
      _id={data._id}
      sendEditData={this.sendEditData}
      removeRow={this.removeRow}
      />
      //  </div>
      )
    });

    let i=0;
    let trackHeader=[];
    this.props.data.map((data)=>{
      if(i==0){
        data.list.map((data)=>{
            trackHeader.push( <TableHeaderColumn key={i}>{data.name}</TableHeaderColumn>);
        })
      }
      i++;
    });

    if(this.props.data.length!=0){
    return(

      <Table
      selectable={this.state.selectable}
      style={{height:'auto'}}
      >

           <TableHeader adjustForCheckbox={this.state.showCheckboxes}
             displaySelectAll={this.state.showCheckboxes}>
             <TableRow>
             <TableHeaderColumn >Month</TableHeaderColumn>
                {trackHeader}
                <TableHeaderColumn >Action</TableHeaderColumn>
                </TableRow>
              </TableHeader>
           <TableBody displayRowCheckbox={this.state.showCheckboxes}
             showRowHover={this.state.showRowHover}
             stripedRows={this.state.stripedRows}
           >
            {projectData}
        </TableBody>
        </Table>

    );
  }else{
    return null;
  }
  }
}
