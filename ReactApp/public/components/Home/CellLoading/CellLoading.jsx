import React from 'react';
// import AddCellLoading from './AddCellLoading.jsx'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import DisplayCellLoading from './DisplayCellLoading.jsx';
import {Link} from 'react-router';
import axios from 'axios';
import DisplayCellLoadingTable from './DisplayCellLoadingTable.jsx';
import AddCellLoadingOld from './AddCellLoadingOld.jsx';
const style = {
  marginRight: 20,
  marginTop:30
};
export default class CellLoading extends React.Component{

	state={
	  cellLoadingData:[]
	}
	componentDidMount=()=>{
	  axios.get('/api/v1/cellLoading/'+this.props.projectID)
	  .then(function (data) {
	    console.log('CellLoading connected to server');
	    console.log(data);
	    console.log(data.data.message);
	    this.setState({cellLoadingData:data.data.message});
	  }.bind(this))
	  .catch(function (error) {
	    console.log(error+"error in CellLoading");
	  });
	}

  LoadingData=(obj)=>{
    let currentData=this.state.cellLoadingData;
    console.log('loading data from AddCellLoadingOld is');
    console.log(obj);
    axios.post('/api/v1/cellLoading',obj)
      .then((data)=>{
        console.log('CellLoading connected to server');
  	    console.log(data.data.message);
        let newData=[data.data.message].concat(currentData);
        console.log('new data is');
        console.log(newData);
        this.setState({cellLoadingData:newData});
        })
      .catch((error)=>{
         console.log(error+"error in CellLoading");
      })
  }

  removeRow=(_id)=>{
    var tmp=this.state.cellLoadingData;
    var dataCurrentState=this.state.cellLoadingData;
      dataCurrentState.forEach((data,index)=>{
        if(data._id==_id){
          var editData=dataCurrentState.splice(index,1);
          editData=null;
        }
      });

    axios.delete('/api/v1/cellLoading/'+_id)
      .then((data)=>{
        console.log('CellLoading connected to server for delete operation');
        this.setState({cellLoadingData:dataCurrentState});
      })
      .catch((error)=>{
         console.log(error+"error in CellLoading");
         this.setState({cellLoadingData:tmp});
      })
    }

    sendEditData=(obj,_id)=>{
      // var tmp=this.state.data;
  		var dataCurrentState=this.state.cellLoadingData;
       var index;
        for (var i = 0; i < dataCurrentState.length; i++) {
          if(dataCurrentState[i]._id==_id){
           // index=obj.cellID;
           var editData=dataCurrentState.splice(i,1,obj);
           editData=null;
            break;
          }
        };
        this.setState({cellLoadingData:dataCurrentState});
    }
	render(){

		return(
			<div>
        {/* <Link to ="/addCellLoading">
			<FloatingActionButton style={style}
			mini={true}>
     		 <ContentAdd />
   		 </FloatingActionButton>
     </Link> */}
     <AddCellLoadingOld LoadingData={this.LoadingData} projectID={this.props.projectID}/>
		<DisplayCellLoadingTable data ={this.state.cellLoadingData}
    removeRow={this.removeRow}
    sendEditData={this.sendEditData}
    />
			</div>
			);
	}
}
