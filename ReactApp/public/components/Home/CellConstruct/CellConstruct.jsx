import React from 'react';
import axios from 'axios';
import AddCellConstruct from './AddCellConstruct.jsx';
import CellConstructTbl from  './CellConstructTbl.jsx';
export default class CellConstruct extends React.Component{

	state={
		cellConstructData:[]
	}
	componentDidMount=()=>{
	  axios.get('/api/v1/cellConstruct/'+this.props.projectID)
	  .then(function (data) {
	    console.log('CellConstruct connected to server');
	    console.log(data);
	    console.log(data.data.message);
	    this.setState({cellConstructData:data.data.message});
	  }.bind(this))
	  .catch(function (error) {
	    console.log(error+"error in DisplayCellLoading");
	  });
	}

	CellConstructObj=(obj)=>{
		console.log('obj receive from source into CellConstruct');
		console.log(obj);

		let currentState=this.state.cellConstructData;
			console.log('current status of cellConstructData');
			console.log(currentState);
			// let newData=[obj].concat(currentState);
			// console.log('newData');
			// this.setState({trackPropList:[]});
			// let tmpObj=[];
			// [obj].map(function(data,i){
			// 	data.list.map(function(data,i){
			// 		tmpObj.push(data.name)
			// 	})
			// });
			// console.log(tmpObj);
			// this.setState({trackPropList:tmpObj});
			// tmpObj=null;

				// this.setState({cellConstructData:newData});

		// $.ajax({
		// 	url:'http://localhost:3000/api/v1/cellConstruct',
		// 	type:'POST',
		// 	data:obj,
		// 	contetntType:'application/json',
		// 	success: function(data){
		// 		 console.log('server connected from cellConstruct');
		//
		// 		 console.log(data.message);
		// 		 var newData=[data.message].concat(currentState);
		// 			 this.setState({cellConstructData:newData});
		// 	}.bind(this),
		// 	error:function(err){
		// 		console.log('server not connected from cellConstruct');
		// 		 this.setState({data:currentState});
		// 	}.bind(this)
		// });
		  // let currentData=this.state.cellConstructData;
		axios.post('/api/v1/cellConstruct',obj)
      .then((data)=>{
        console.log('cellConstruct connected to server');
  	    // console.log(data);
  	    console.log(data.data.message);
        let newData=[data.data.message].concat(currentState);
        console.log('new data is');
        console.log(newData);
        this.setState({cellConstructData:newData});

      })
      .catch((error)=>{
         console.log(error+"error in cellConstruct");
      })

	}

	editEachData=(obj)=>{
		let dataCurrentState=this.state.cellConstructData;
		var index;
		for (var i = 0; i < dataCurrentState.length; i++) {
			if(dataCurrentState[i]._id==obj._id){
			 // index=obj.cellID;
			 var editData=dataCurrentState.splice(i,1,obj);
			 editData=null;
				break;
			}
	}
	this.setState({cellConstructData:dataCurrentState});
}

removeTblRow=(_id)=>{
// 	let dataCurrentState=this.state.cellConstructData;
// 	var index;
// for (var i = 0; i < dataCurrentState.length; i++) {
// 	if(dataCurrentState[i]._id==_id){
// 	 // index=obj.cellID;
// 	 var editData=dataCurrentState.splice(i,1);
// 	 editData=null;
// 		break;
// 	}
// };
//
// this.setState({cellConstructData:dataCurrentState});

var tmp=this.state.cellConstructData;
var dataCurrentState=this.state.cellConstructData;
	dataCurrentState.forEach((data,index)=>{
		if(data._id==_id){
			var editData=dataCurrentState.splice(index,1);
			editData=null;
		}
	});

axios.delete('/api/v1/cellConstruct/'+_id)
	.then((data)=>{
		console.log('CellLoading connected to server for delete operation');
		this.setState({cellLoadingData:dataCurrentState});
	})
	.catch((error)=>{
		 console.log(error+"error in CellLoading");
		 this.setState({cellConstructData:tmp});
	})
}
	render(){

		return(
			<div>
			<AddCellConstruct CellConstructObj={this.CellConstructObj}
			projectID={this.props.projectID}/>
			<CellConstructTbl cellConstructData={this.state.cellConstructData}
				trackList={this.state.trackPropList}
				editEachData={this.editEachData}
				removeTblRow={this.removeTblRow}
			 />
			</div>
			);
	}
}
