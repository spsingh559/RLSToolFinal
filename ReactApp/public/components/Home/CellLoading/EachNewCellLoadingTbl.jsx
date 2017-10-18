import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Link} from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
export default class EachNewCellLoadingTbl extends React.Component{

  state={
    editStatus:false,
    localMonthName:this.props.monthName
  }

  removeTblRow=()=>{
    this.props.removeRow(this.props._id);
  }

  handleLocalMonthChange=(e)=>{
    console.log(e.target.value);
    this.setState({localMonthName:e.target.value});
  }
  editData=()=>{
    this.setState({editStatus:true});
  }
  editSubmit=()=>{
    alert(this.state.localMonthName);
    let editObj={
      _id:this.props._id,
      monthName:this.state.localMonthName,
      list:this.props.list
    }
    this.props.sendEditData(editObj,this.props._id);
    this.setState({editStatus:false});
  }
  render(){
    // console.log('EachNewCellLoadingTbl is called');
    // console.log('data is');
    let items=[];
    let txtArr=[];
    this.props.list.map(function(data,i){
    items.push(  <TableRowColumn key={i} style={{width:'auto'}}>{data.value}</TableRowColumn>);
    txtArr.push(
      <TableRowColumn key={i} style={{width:'auto'}}>
      <TextField
         hintText="Edit Value"
         floatingLabelText={data.name}
         value={data.value}
        //  onChange={this.handleListChange}
       />
     </TableRowColumn>
    )
    })
    // let txtArr=[];
    // this.props.list.forEach((data,i)=>{
    //
    //   txtArr.push(
    //     <TableRowColumn key={i} style={{width:'auto'}}>
    //     <TextField
    //        hintText="Edit Value"
    //        floatingLabelText={data.name}
    //        value={data.value}
    //        onChange={this.handleListChange}
    //      />
    //    </TableRowColumn>
    //   )
    // });

    if(this.state.editStatus==false){
    return(
      <TableRow >
        <TableRowColumn style={{width:'auto'}} >{this.props.monthName}</TableRowColumn>
                {items}
        <TableRowColumn >
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
      <MenuItem primaryText="Edit" onTouchTap={this.editData}/>
      <MenuItem primaryText="Remove" onTouchTap={this.removeTblRow}/>
    </IconMenu>
    </TableRowColumn>

      </TableRow>
    )}
      else{
        return(
          <TableRow >
            <TableRowColumn style={{width:'auto'}} >
              <TextField
                 hintText="Edit monthName"
                 floatingLabelText="Enter monthName"
                 value={this.state.localMonthName}
                 onChange={this.handleLocalMonthChange}
               />
            </TableRowColumn>
            {txtArr}
            <FlatButton
              key="tw0"
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.editSubmit}
            />
          </TableRow>
        )
      }

  }
}
