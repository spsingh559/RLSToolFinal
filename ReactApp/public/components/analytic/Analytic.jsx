import React from 'react';
import axios from 'axios';
// import {Grid} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import ChartDisplay from './ChartDisplay.jsx';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid,Row,Col} from 'react-bootstrap';
// import {Grid,Row,Col} from 'react-bootstrap';
import StackChart from './StackChart.jsx';


const margin = {top: 20, right: 20, bottom: 30, left: 40};


export default class Analytic extends React.Component{

  state={
    cellData:[],
    resData:[],
    items:[],
    LoadingData:[],
    resStackData:[]
  }

  handleDrpDwnChange = (event, index, value) => {
		this.setState({value})
		console.log(this.state.value);
    $.ajax({
      url:'http://localhost:3000/api/v1/cellSummary/'+value,
      type:'GET',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from CellSummary for get');
         console.log(data.message);
           this.setState({cellData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Cell Summary');
      }.bind(this)
    });

    $.ajax({
      url:'http://localhost:3000/api/v1/cellLoading/'+value,
      type:'GET',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from cellLoading for get');
         console.log(data.message);
           this.setState({LoadingData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from cellLoading');
      }.bind(this)
    });
  }

	componentDidMount=()=>{
		axios.get('/api/v1/ProjectDetail')
			.then(function (data) {
				console.log('AddCellConstruct connected to server');
				console.log(data);
				console.log(data.data.message);
				data.data.message.forEach((data)=>{
					this.state.items.push(<MenuItem value={data.projectID} key={data._id} primaryText={data.projectName} />);
				})
			}.bind(this))
			.catch(function (error) {
				console.log(error+"error in AddCellConstruct");
			});
	}

showData=()=>{
  let arr=[];
  if(this.state.cellData.length==0){
    alert('data not found, Please check cell Summary of project');
  }else{
  console.log('cell data is');
  console.log(this.state.cellData);
  this.state.cellData.forEach((data)=>{
  let localobj={
      text:data.cellName,
      value:data.resourceValue
    }
    console.log(localobj);
    arr.push(localobj);
  });
  console.log('final arr');
  this.setState({resData:arr});
  console.log(arr);}

  let arrNew=[];
  console.log('LoadingData');
  console.log(this.state.LoadingData);
  if(this.state.LoadingData.length!=0){
  this.state.LoadingData.forEach((data)=>{
    let localDatas={
      label:data.monthName,
      values:[]
    };
    data.list.forEach((data)=>{
      let localValues={
        x:data.name,
        y:data.value
      }
      localDatas.values.push(localValues);
    })
    arrNew.push(localDatas);
  })
  console.log('modified data is');
  console.log(arrNew);
  this.setState({resStackData:arrNew});}else{
    alert('NO Data found in Cell Loading');
  }
}

  render(){
    return(
        <Grid style={{marginTop:'80px'}}>
              <SelectField
                  value={this.state.value}
                  onChange={this.handleDrpDwnChange}
                  floatingLabelText="Select Project"
                >
                  {this.state.items}
                </SelectField>
  			{/* <FlatButton label="View Chart" primary={true} onTouchTap={this.showData} /> */}
        <RaisedButton label="Primary" primary={true} onTouchTap={this.showData} style={{marginLeft:'50px'}}/>
        <Row>
          <Col sm={6}>
            <ChartDisplay resData={this.state.resData} />
          </Col>
          <Col sm={6}>
            <StackChart stackData={this.state.resStackData} LoadingData={this.state.LoadingData} />
          </Col>
        </Row>




    {/* <p> HI</p> */}
  </Grid>
    )
  }
}
