import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import EachNewDashTable from './EachNewDashTable.jsx';
const styles={
  height:'auto',
  width:'auto'
}
export default class DisplayDashBorad extends React.Component{

  state={
    showCheckboxes:false,
    selectable:false
  }
  render(){
    let projectData = this.props.data.map((data)=>{
      return(
        // <div key={data._id}>
      <EachNewDashTable
       key={data._id}
      practiceName={data.practiceName}
      roleName={data.roleName}
      locationName={data.locationName}
      _id={data._id}
      data={data.list}
      totalPD={data.totalPD}
      bandName={data.bandName}
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
      <Paper style={styles} zDepth={5}>
      <Table
      selectable={this.state.selectable}
      style={{height:'auto'}}
      >

           <TableHeader adjustForCheckbox={this.state.showCheckboxes}
               displaySelectAll={this.state.showCheckboxes}>
             <TableRow>
             <TableHeaderColumn >Practise</TableHeaderColumn>
              <TableHeaderColumn >Role</TableHeaderColumn>
               <TableHeaderColumn >Band</TableHeaderColumn>
                <TableHeaderColumn >Location</TableHeaderColumn>
                <TableHeaderColumn >Total PD</TableHeaderColumn>
                {trackHeader}
                </TableRow>
              </TableHeader>
           <TableBody displayRowCheckbox={this.state.showCheckboxes}>
            {projectData}
        </TableBody>
        </Table>
      </Paper>
    );
  }else{
    return null;
  }
  }
}
