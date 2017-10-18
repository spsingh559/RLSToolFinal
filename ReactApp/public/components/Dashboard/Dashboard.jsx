	import React from 'react';
	import {Grid} from 'react-bootstrap';
	import FlatButton from 'material-ui/FlatButton';
	// import DashBoardPage from './DashBoardPage.jsx';
	import DisplayDashBorad from './DisplayDashBorad.jsx';
	import CircularProgress from 'material-ui/CircularProgress';
	import DropDownMenu from 'material-ui/DropDownMenu';
	import MenuItem from 'material-ui/MenuItem';
	import axios from 'axios';
	import Workbook from 'react-excel-workbook';

	export default class DashBoard extends React.Component{

		state={
			cellLoadingData:[],
			cellConstructData:[],
			dashBoradData:[],
			resData:[],
			secondsElapsed:0,
			items:[],
			value:''
		}

		handleDrpDwnChange = (event, index, value) => {
			this.setState({value})
			console.log(this.state.value);
			// axios.get('/api/v1/cellLoading/'+value)
			// 	.then(function (data) {
			// 		console.log('Dashboard connected to server for get data');
			// 		this.setState({cellLoadingData:data.message});
			// 		// this.state.item.push
			// 	}.bind(this))
			// 	.catch(function (error) {
			// 		console.log(error+"error in Dashboard");
			// 	});

				// axios.get('/api/v1/cellConstruct/'+value)
				// 	.then(function (data) {
				// 		console.log('Dashboard connected to server for get data');
				// 		this.setState({cellConstructData:data.message});
				//
				// 	}.bind(this))
				// 	.catch(function (error) {
				// 		console.log(error+"error in Dashboard");
				// 	});


		$.ajax({
			url:'http://localhost:3000/api/v1/cellLoading/'+value,
			type:'GET',
			contetntType:'application/json',
			success: function(data){
				 console.log('server connected from Cell Loading for get');
				 console.log(data.message);
					 this.setState({cellLoadingData:data.message});
			}.bind(this),
			error:function(err){
				console.log('server not connected from Cell Loading');
			}.bind(this)
		});

		$.ajax({
			url:'http://localhost:3000/api/v1/cellConstruct/'+value,
			type:'GET',
			contetntType:'application/json',
			success: function(data){
				 console.log('server connected from Cell cellConstruct for get');
				 console.log(data.message);
					 this.setState({cellConstructData:data.message});
			}.bind(this),
			error:function(err){
				console.log('server not connected from Cell Construct');
			}.bind(this)
		});
	}

		componentDidMount=()=>{
			this.intervalTrack = setInterval(() => this.tick(), 500);
			axios.get('/api/v1/ProjectDetail')
				.then(function (data) {
					console.log('AddCellConstruct connected to server');
					console.log(data);
					console.log(data.data.message);
					//  this.setState({localTrackList:data.data.message});
					data.data.message.forEach((data)=>{
						this.state.items.push(<MenuItem value={data.projectID} key={data._id} primaryText={data.projectName} />);
					})
					// this.state.item.push
				}.bind(this))
				.catch(function (error) {
					console.log(error+"error in AddCellConstruct");
				});
		}

		// componentDidMount=()=>{
		// 	  this.intervalTrack = setInterval(() => this.tick(), 500);
		// 	$.ajax({
		// 		url:'http://localhost:3000/api/v1/cellLoading',
		// 		type:'GET',
		// 		contetntType:'application/json',
		// 		success: function(data){
		// 			 console.log('server connected from Cell Loading for get');
		// 			 console.log(data.message);
		// 				 this.setState({cellLoadingData:data.message});
		// 		}.bind(this),
		// 		error:function(err){
		// 			console.log('server not connected from Cell Loading');
		// 		}.bind(this)
		// 	});
		//
		// 	$.ajax({
		// 		url:'http://localhost:3000/api/v1/cellConstruct',
		// 		type:'GET',
		// 		contetntType:'application/json',
		// 		success: function(data){
		// 			 console.log('server connected from Cell cellConstruct for get');
		// 			 console.log(data.message);
		// 				 this.setState({cellConstructData:data.message});
		// 		}.bind(this),
		// 		error:function(err){
		// 			console.log('server not connected from Cell Construct');
		// 		}.bind(this)
		// 	});
		//
		// 	console.log('set state of cellLoadingData');
		// 	console.log(this.state.cellLoadingData);
		// 	console.log('set state of cellConstruct');
		// 	console.log(this.state.cellConstructData);
		// }

		tick=()=> {
	      this.setState((prevState) => ({
	        secondsElapsed: prevState.secondsElapsed + 1,

	      }));

	      if(this.state.secondsElapsed>3){
	        clearInterval(this.intervalTrack);
	      }
	    }

		showData=()=>{
			// let res=0;
			let currentData=this.state.resData;
			let cCData=this.state.cellConstructData;
			let cLData=this.state.cellLoadingData;
			console.log('length of cCData'+ cCData.length);
			let newData=[];
			let res;
			if(cCData.length==0 || cLData.length==0){
				alert('data not found');
			}else{
			cCData.forEach((CData)=>{
				let finalObj={list:[]};
				finalObj.practiceName=CData.practiceName;
				finalObj.roleName=CData.roleName;
				finalObj.bandName=CData.bandName;
				finalObj.locationName=CData.locationName;
				finalObj._id=CData._id;
				cLData.forEach((LData)=>{
					let obj={};
					obj.name=LData.monthName;
					res=0;
					LData.list.forEach((LListData)=>{
							CData.list.forEach((CListData)=>{
							if(LListData.name==CListData.name){
								res=res+LListData.value*CListData.value;
							}
						});
					});
						obj.value=res;
						finalObj.list.push(obj);
				});
				let resPD=0;
				// [finalObj].forEach((data)=>{
					finalObj.list.forEach((data)=>{
						resPD=resPD+data.value;
				});
				let totalPD=resPD*20;
				finalObj.totalPD=totalPD;
				newData=[finalObj].concat(newData);
			});
			console.log('output is');
			console.log(newData);
			this.setState({resData:newData});
		}

		}

		render(){

			// let arr=[];
			// this.state.resData.forEach((data)=>{
			// 	data.list.forEach((data)=>{
			// 		arr.push(<Workbook.Column label={data.name} value={data.name} />)
			// 	})
			// })
		  if(this.state.secondsElapsed>2){
			return(
				<Grid>
				<div>
				</div>
				<h3> Select Project </h3>
				<DropDownMenu maxHeight={300} value={this.state.value}
							onChange={this.handleDrpDwnChange}
							style={{width:'200px'}}
							>
								{this.state.items}
							</DropDownMenu>
				<FlatButton label="View Data" primary={true} onTouchTap={this.showData} />

				<DisplayDashBorad data ={this.state.resData} />

				<div className="row text-center" style={{marginTop: '200px'}}>
	    <Workbook filename="example.xlsx" element={<button >Try me!</button>}>
	      <Workbook.Sheet data={this.state.resData} name="Sheet A">
	        <Workbook.Column label="practiseName" value="practiceName"/>
	        <Workbook.Column label="Doman Name" value="roleName"/>
					<Workbook.Column label="Location" value="locationName"/>
					<Workbook.Column label="Band" value="bandName"/>
					{/* {arr} */}
					{/* <Workbook.Column label="Name" value="data.value"/> */}
	      </Workbook.Sheet>
	    </Workbook>
	   </div>
				{/* <DashBoardPage  /> */}
			</Grid>
		)}else{
			return(
				<CircularProgress  style={{marginTop:'100px', marginLeft:'50%'}}/>
			)
		}
		}
	}
