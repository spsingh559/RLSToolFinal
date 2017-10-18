import React from 'react';
import EachTrackDisplay from './EachTrackDisplay.jsx';
export default class DisplayTrack extends React.Component{

  chipDltRequest=(_id)=>{
    this.props.chipDltRequest(_id);
  }

  editTrackName=(obj,_id)=>{
    this.props.editTrackName(obj,_id);
  }

  render(){

    console.log("DisplayTrack Componennt");
    console.log(this.props.trackData);

    var projectData = this.props.trackData.map(function(data) {
      console.log(data);
        return (

          <div key={data._id}>
          <EachTrackDisplay
          trackName={data.trackName}
          _id={data._id}
          chipDltRequest={this.chipDltRequest}
          editTrackName={this.editTrackName}
          />
           </div>

        );
      }.bind(this));

    return(
      <div>
      {projectData}
    </div>
    );
  }

}
