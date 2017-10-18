import React from 'react';
import ReactDOM from 'react-dom';
import EachProjectDetail from './EachProjectDetail.jsx';

export default class ProjectDetail extends React.Component {


	saveEditProjectDetail=(obj,_id)=>{
		this.props.saveEditProjectDetail(obj,_id);
	};

	removeProjectDetail=(_id,projectID)=>{
		this.props.removeProjectDetail(_id,projectID);
	}

	render(){
		console.log(this.props.data);
		if(this.props.data.Length!=0){
		var projectData = this.props.data.map(function(data) {
	      return (
	      	<div key={data._id}>
	        <EachProjectDetail
	        projectName={data.projectName}
	        projectID={data.projectID}
	        _id={data._id}
	        saveEditProjectDetail={this.saveEditProjectDetail}
	        removeProjectDetail={this.removeProjectDetail}
	        />
	         </div>

	      );
	    }.bind(this));
	}
		return(
			<div>
				{projectData}
			</div>
			);
	}
}
