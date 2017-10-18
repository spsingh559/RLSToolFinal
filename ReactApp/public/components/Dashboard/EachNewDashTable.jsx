import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class EachNewDashTable extends React.Component{

  render(){
    console.log('EachNewDashTable is called');
    console.log('data is');
    console.log(this.props.data);
    console.log(this.props.roleName);
    let items=[];
  this.props.data.map(function(data,i){
    items.push(  <TableRowColumn key={i} style={{width:'auto'}}>{data.value}</TableRowColumn>);
  })
    return(
      <TableRow >
                <TableRowColumn style={{width:'auto'}} >{this.props.practiceName}</TableRowColumn>
                <TableRowColumn style={{width:'auto'}}>{this.props.roleName}</TableRowColumn>
                <TableRowColumn style={{width:'auto'}}>{this.props.bandName}</TableRowColumn>
                <TableRowColumn style={{width:'auto'}}>{this.props.locationName}</TableRowColumn>
                <TableRowColumn style={{width:'auto'}}>{this.props.totalPD}</TableRowColumn>
                {items}

      </TableRow>
    )
  }
}
