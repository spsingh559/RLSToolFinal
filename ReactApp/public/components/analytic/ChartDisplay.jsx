import React from 'react';
import BarChart from 'react-bar-chart';
import styles from './BarChart.css';
const margin = {top: 10, right: 20, bottom: 30, left: 40};
export default class ChartDisplay extends React.Component{

  render(){
    if(this.props.resData.length!=0){
    return(
      <div style={{width: '50%',marginTop:'20px'}} className="BarChartCSS" >
        <h4>Cell Summary analysis</h4>
          <BarChart ylabel='Resource Count'
            width={200}
            height={400}
            margin={margin}
            data={this.props.resData}
            // onBarClick={this.handleBarClick}
          />
</div>
    )}else{
      return null;
    }
  }
}
