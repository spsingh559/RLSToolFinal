import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
const style = {
  height: 150,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export default class DashBoardPage extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        trackCount:8,
        cellSummaryCount:23,
        projecCount:2,
        secondsElapsed: 0,
        secondsElapsedCellSummary:0,
        secondsElapsedProject:0
      };
    }

tick=()=> {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1,

    }));

    if(this.state.secondsElapsed>=this.state.trackCount){
      clearInterval(this.intervalTrack);
    }
  }

  tickCellSummary=()=>{
    this.setState((prevState) => ({
      secondsElapsedCellSummary: prevState.secondsElapsedCellSummary + 1,

    }));

    if(this.state.secondsElapsedCellSummary>=this.state.cellSummaryCount){
      clearInterval(this.intervalCellSummary);
    }
  }

  tickProject=()=>{
    this.setState((prevState) => ({
      secondsElapsedProject: prevState.secondsElapsedProject + 1,

    }));

    if(this.state.secondsElapsedProject>=this.state.projecCount){
      clearInterval(this.intervalProject);
    }
  }

componentDidMount=()=>{
  this.intervalTrack = setInterval(() => this.tick(), 200);
  this.intervalCellSummary = setInterval(() => this.tickCellSummary(), 100);
  this.intervalProject = setInterval(() => this.tickProject(), 1000);
}
  render(){

    return(
      <Grid>
        <Row style={{marginTop:'100px'}}>
         <Col xs={4}> <Paper style={style} zDepth={5} >
          <h4> Number of Track </h4>
            <Divider style={{backgroundColor:'rgb(0, 188, 212)'}} />
            <h1 style={{marginTop:'20px'}}>{this.state.secondsElapsed}</h1>
         </Paper>
         </Col>

         <Col xs={4}> <Paper style={style} zDepth={5} >
          <h4> Number of CellSummary </h4>
            <Divider style={{backgroundColor:'rgb(0, 188, 212)'}} />
            <h1 style={{marginTop:'20px'}}>{this.state.secondsElapsedCellSummary}</h1>
         </Paper>
         </Col>

         <Col xs={4}> <Paper style={style} zDepth={5} >
          <h4> Number of Project </h4>
              <Divider style={{backgroundColor:'rgb(0, 188, 212)'}} />
            <h1 style={{marginTop:'20px'}}>{this.state.secondsElapsedProject}</h1>
         </Paper>
         </Col>

    </Row>
    </Grid>
    )
  }
}
