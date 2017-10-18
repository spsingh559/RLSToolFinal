import React from 'react';
var BarChart = require('react-d3-components').BarChart;
import {Grid,Row,Col} from 'react-bootstrap';

export default class StackChart extends React.Component{
  render(){
    console.log('loading data in StackChart');
    console.log(this.props.LoadingData);
    let arr=[];
    this.props.LoadingData.forEach((data,i)=>{
      arr.push(<li key={i}>{data.monthName}</li>);
    })
    if(this.props.stackData.length!=0){
    return(
      <div  style={{marginTop:'20px'}}>

          <Row>
            <Col xs={8}>
              <h4>Cell Loading analysis</h4>
              <BarChart
                  data={this.props.stackData}
                  width={400}
                  height={400}
                  margin={{top: 10, bottom: 60, left: 50, right: 10}}
                />
            </Col>
            <Col xs={4}>
            <h4>Color Coding from bottom to top </h4>
              <ul>
            {/* {
              this.props.LoadingData.forEach((data)=>{

                  <li>
                    {data.monthName}
                  </li>

              })

            } */}
            {arr}
              </ul>

            </Col>
          </Row>

              </div>
    )}else{
      return null;
    }
  }
}
