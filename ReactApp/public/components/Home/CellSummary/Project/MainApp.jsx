import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import ProjectForm from './ProjectForm.jsx';
import ProjectDetail from './ProjectDetail.jsx';

export default class MainApp extends React.Component{

	state={
		projectid:'',
		projectName:'',
		data:[]
	};

	componentWillMount=()=>{
    $.ajax({
      url:'http://localhost:3000/api/v1/ProjectDetail',
      type:'GET',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Main APP Comp for get');
         console.log(data);
         data.message.reverse();
           this.setState({data:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Main APP Comp');
      }.bind(this)
    });
    console.log("CWM is called");
  }

	submitProjectInfo=(obj)=>{
	var currentState=this.state.data;
    console.log('inside Add role Component');
  //  console.log('name ' + roleName + 'id is '+ id);
   	var projObj={
			_id:obj._id,
			projectID:obj.projectID,
			projectName:obj.projectName
		};

    $.ajax({
      url:'http://localhost:3000/api/v1/ProjectDetail',
      type:'POST',
      data:projObj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Add role');
         console.log(data);
         var newData=[data.message].concat(currentState);
           this.setState({data:newData});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Add role');
         this.setState({data:currentState});
      }.bind(this)
    });
	}

	saveEditProjectDetail=(obj,_id)=>{
    var tmp=this.state.data;
		var dataCurrentState=this.state.data;
     var index;
      for (var i = 0; i < dataCurrentState.length; i++) {
        if(dataCurrentState[i]._id==_id){
         // index=obj.cellID;
         var editData=dataCurrentState.splice(i,1,obj);
         editData=null;
          break;
        }
      };
      console.log("data after edit");
      console.log(dataCurrentState);

    $.ajax({
      url:'http://localhost:3000/api/v1/ProjectDetail',
      type:'PUT',
      data:obj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Main APP Comp for put');
         console.log(data.message);

      this.setState({data:dataCurrentState});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Main APP Comp for put');
          this.setState({data:tmp});
      }.bind(this)
    });

	}

	removeProjectDetail=(_id,projectID)=>{
		var tmp=this.state.data;
		var dataCurrentState=this.state.data
		var index;
       for (var i = 0; i < dataCurrentState.length; i++) {
         if(dataCurrentState[i]._id==_id){
          // index=obj.cellID;
          var editData=dataCurrentState.splice(i,1);
          editData=null;
           break;
         }
       };

			//  let objToServer={
			// 	 _id:_id,
			// 	 projectID:projectID
			//  };
    $.ajax({
      url:'http://localhost:3000/api/v1/ProjectDetail/'+projectID,
      type:'DELETE',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from MainApp for remove');
         console.log(data);

       this.setState({data:dataCurrentState});
    // /       this.setState({roleData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from MainApp for remove');
        this.setState({data:tmp});
      }.bind(this)
    });
	}

	render(){
		return(

			<div>

           <ProjectForm submitProjectDetail={this.submitProjectInfo}/>
           <ProjectDetail data ={this.state.data}
           saveEditProjectDetail={this.saveEditProjectDetail}
           removeProjectDetail={this.removeProjectDetail}
           />
           </div>
			)
	}
}





// ReactDOM.render(<MainApp  />,
//  document.getElementBy_id('BindMainComponent'));
