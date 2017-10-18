import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Grid,Row,Col} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {Link} from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
const cardStyle={
    position:'relative',
    marginTop:100,
    left: 0,
    right: 0,
    marginRight:'auto',
    marginLeft:'auto',
    width:500
}
// const var monthName=['Jan', 'Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
export default class AddCellLoading extends React.Component{

  state={
    secondsElapsed:0,
    startDate:null,
    trackData:[],
    txtValue:'',
    name:'',
    trackObj:{},
    open:false
  }
  componentDidMount=()=>{
    console.log('data from routing is');
    console.log(this.props.params._id);
    axios.get('/api/v1/cellLoading/'+this.props.params._id)
	  .then(function (data) {
	    console.log('DisplayCellLoading connected to server');
	    console.log(data);
	    console.log(data.data.message);
	    // this.setState({cellLoadingData:data.data.message});
	  }.bind(this))
	  .catch(function (error) {
	    console.log(error+"error in DisplayCellLoading");
	  });

      // this.intervalTrack = setInterval(() => this.tick(), 500);
        axios.get('/api/v1/trackSetting')
    	  .then(function (data) {
    	    console.log('DisplayCellLoading connected to server');
    	    console.log(data);
    	    console.log(data.data.message);
    	    this.setState({trackData:data.data.message});
    	  }.bind(this))
    	  .catch(function (error) {
    	    console.log(error+"error in AddCellLoading");
    	  });
  }

  tick=()=> {
      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed + 1,

      }));

      if(this.state.secondsElapsed>5){
        clearInterval(this.intervalTrack);
      }
    }

  handleStatrtDate=(e,date)=>{
    this.setState({startDate:date});
  }

  handleTrackNameChange=(e)=>{

    this.setState({txtValue:e.target.value,name:e.target.name});
	}


  handleBlur=()=>{
    console.log('txtbox name is'+this.state.name);
    console.log('txtbox value is'+ this.state.txtValue);
    let name=this.state.name;
    let values=this.state.txtValue;
    if(name!='' && values!=''){
    this.state.trackObj[name]=values}
  }

  sumbit=()=>{
    let monthName=['Jan', 'Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    var currentMonth=this.state.startDate.getMonth()+1;
    // let lastMonth=this.state.endDate.getMonth()+1;
    let currentYear=this.state.startDate.getFullYear();

    let finalObj={list:[]};
    finalObj._id=Date.now();
      finalObj.monthName=monthName[currentMonth-1]+currentYear;
    // finalObj.monthName=this.state.startDate;
    Object.keys(this.state.trackObj).map((item) => {
      let objLocal={
        name:item,
        values:parseInt(this.state.trackObj[item])
      };
      finalObj.list.push(objLocal);
    });
    console.log(finalObj);
    this.setState({open:true,txtValue:'',name:'',startDate:''});

  }

  handleRequestClose=()=>{
    this.setState({open:false});
  }

	render(){


    // this.state.secondsElapsed>5:return
    let arr=[];
    this.state.trackData.forEach((data,index)=>{
      arr.push(<Col sm={12} key={index} >
    <TextField
      hintText="Enter Value"
      name={data.trackName}
      floatingLabelText={data.trackName}
      onBlur={this.handleBlur}
      onChange={this.handleTrackNameChange}
    />
  </Col>);
    });
    if(this.state.secondsElapsed>5){
		return(
      <Card style={cardStyle}>
    <CardHeader
      title="Add CellLoading"
    />
    <CardText>
    <Grid>
      <Row>
        <Col sm={12} >
              <DatePicker hintText="Select Month"
                mode="landscape"
              onChange={this.handleStatrtDate}/>
        </Col>
      </Row>
      <Row>

      {arr}
      </Row>

    </Grid>
    </CardText>
    <CardActions>
      <FlatButton label="Submit" onTouchTap={this.sumbit}/>
      <Link to='/'>
      <FlatButton label="Cancel" /></Link>
    </CardActions>
    <Snackbar
          open={this.state.open}
          message="Cell Loading Data Added successfully"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
  </Card>
)}
else{
  return(
    <CircularProgress  style={{marginTop:'100px'}}/>
  )
}
	}
}
