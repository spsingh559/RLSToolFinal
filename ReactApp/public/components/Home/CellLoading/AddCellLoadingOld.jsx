import React from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AppBar from 'material-ui/AppBar';
import _ from 'lodash';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Grid,Row,Col} from 'react-bootstrap';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

const style = {
  marginRight: 20,
  marginTop:30
};

const customContentStyle = {
  width: '50%'
  };

export default class AddCellLoading extends React.Component{


  state={
    startDate:null,
    trackData:[],
    txtValue:'',
    name:'',
    trackObj:{},
    open:false,
    openDial:false
  }
  componentDidMount=()=>{
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

  submit=()=>{
    let monthName=['Jan', 'Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    var currentMonth=this.state.startDate.getMonth()+1;
    let currentYear=this.state.startDate.getFullYear();
    let finalObj={list:[]};
    finalObj._id=Date.now();
    finalObj.projectID=this.props.projectID;
    finalObj.monthName=monthName[currentMonth-1]+currentYear;

    Object.keys(this.state.trackObj).map((item) => {
        let objLocal={
        name:item,
        value:parseInt(this.state.trackObj[item])
        };
        finalObj.list.push(objLocal);
    });
    console.log(finalObj);
    this.props.LoadingData(finalObj);
    this.setState({openDial:false,open:true,txtValue:'',name:'',startDate:''});
  }

  handleRequestClose=()=>{
    this.setState({open:false});
  }

  handleClose=()=>{
    this.setState({openDial:false});
  }

  openDialogueBar=()=>{
    this.setState({openDial:true});
  }

	render(){
    let arr=[];
    this.state.trackData.forEach((data,index)=>{
    arr.push(
      <Col sm={12} key={index} >
        <TextField
          hintText="Enter Value"
          name={data.trackName}
          floatingLabelText={data.trackName}
          onBlur={this.handleBlur}
          onChange={this.handleTrackNameChange}
        />
      </Col>);
    });
    let titleBar=<AppBar title="Month List" />;
		const actions = [
       <Divider key ="three" style={{backgroundColor:'rgb(0, 188, 212)'}}/>,
          <FlatButton
            key="one"
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            key="two"
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.submit}
          />,
        ];
		return(
			<div>
  			<FloatingActionButton style={style}
  			onTouchTap={this.openDialogueBar}
  			mini={true}>
       		 <ContentAdd />
     		 </FloatingActionButton>
        <Dialog
          title={titleBar}
          actions={actions}
          open={this.state.openDial}
          modal={true}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          >
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
          </Dialog>
          <Snackbar
                open={this.state.open}
                message="Cell Loading Data Added successfully"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
			</div>
			)
	}
}


// import React from 'react';
// import ReactDOM from 'react-dom';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
// import AppBar from 'material-ui/AppBar';
// import _ from 'lodash';
// import Divider from 'material-ui/Divider';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import {Grid,Row,Col} from 'react-bootstrap';
// import ActionDone from 'material-ui/svg-icons/action/done';
// import ContentClear from 'material-ui/svg-icons/content/clear';
// import {blue500, red500, greenA200} from 'material-ui/styles/colors';
// import IconButton from 'material-ui/IconButton';
// import GenrateMonth from './GenrateMonth.jsx';
// const style = {
//   marginRight: 20,
//   marginTop:30
// };
//
// const customContentStyle = {
//   width: '50%',
//   maxWidth: 'none',
// };
//
// // const var monthName=['Jan', 'Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
// export default class AddCellLoading extends React.Component{
//
// 	state={
// 		// openDialogue:false,
//     startDate:null,
//     endDate:null,
//     totalMonth:0,
//     listName:[],
//     trackName:'',
//     monthName:['Jan', 'Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
//     totalMonthList:[],
//     txtValue:'',
//     name:'',
//     items:[],
//     allMonthListobj:{},
//     addContent:false
// 	}
//
// 	openDialogueBar=()=>{
// 		// this.setState({openDialogue:true});
//     this.setState({addContent:true});
// //     $.ajax({
// //       url:'http://localhost:3000/api/v1/trackSetting',
// //       type:'GET',
// //       contetntType:'application/json',
// //       success: function(data){
// //          console.log('server connected from Add Track for get');
// //          console.log(data);
// //            // this.setState({trackData:data.message});
// //            for (let i = 0; i < data.message.length; i++ ) {
// //                 this.state.items.push(<MenuItem value={data.message[i].trackName} key={i} primaryText={data.message[i].trackName} />);
// //               }
// // console.log("items");
// //   // console.log(items);
// //       }.bind(this),
// //       error:function(err){
// //         console.log('server not connected from Add track');
// //       }.bind(this)
// //     });
// //     console.log("Drop down for track in CellSummary");
// }
//
//
// 	handleClose=()=>{
// 		this.setState({openDialogue:false});
// 	}
//
// 	handleTrackNameChange=(e)=>{
//
//     this.setState({txtValue:e.target.value,name:e.target.name});
// 	}
//
//
//   handleBlur=()=>{
//     console.log('name is '+this.state.name +'and value is'+ this.state.txtValue);
//     this.state.allMonthListobj[this.state.name]=this.state.txtValue;
//   }
//
//
//   getTable=()=>{
//        var currentMonth=this.state.startDate.getMonth()+1;
//        let lastMonth=this.state.endDate.getMonth()+1;
//        let currentYear=this.state.startDate.getFullYear();
//        let lastYear=this.state.endDate.getFullYear();
//        var numberOfYear=lastYear-currentYear;
//        var month=0;
//     // console.log("month in current year is "+ month);
//       if(numberOfYear==0){
//         month=(this.state.endDate.getMonth()+1)-(this.state.startDate.getMonth()+1)+1;
//       }else{
//         var month = 12- currentMonth+1;
//         for (var i =1; i <=numberOfYear ; i++) {
//           if(i==numberOfYear){
//             month=month+lastMonth;
//           }else{
//             month=month+12;
//           }
//         }
//       }
//       let tmpArr=[];
//       let lstTmpArr=[];
//
//       let counter=currentMonth;
//       for(let i=0; i<month;i++){
//         if(counter>12){
//           console.log('inside if loop');
//           console.log('counter is'+ counter);
//           counter=counter%12;
//           currentYear++;
//         }
//         tmpArr.push({name:this.state.monthName[counter-1]+currentYear});
//         counter++;
//       }
//       console.log('array is');
//       console.log(tmpArr);
//       tmpArr.forEach((data,index)=>{
//          this.state.items.push(<MenuItem value={data.name} key={index} primaryText={data.name} />);
//       })
//         this.setState({totalMonth:month,totalMonthList:tmpArr});
//         console.log("total month is"+ this.state.totalMonth);
//         console.log('total month list is'+ this.state.totalMonthList);
//
//         	this.setState({openDialogue:true});
//   }
//
//   handleStatrtDate=(e,date)=>{
//     this.setState({startDate:date});
//   }
//
//   handleendDate=(e,date)=>{
//     this.setState({endDate:date});
//   }
//
//   handleDrpDwnChange = (event, index, value) => this.setState({value});
//
//   onAddingTitle=(key)=> {
//       event.preventDefault();
//       console.log('object is');
//       console.log(this.state.allMonthListobj);
//
//       let obj={
//         _id:Date.now(),
//         cellName:this.state.value,
//         list:[]
//       };
//
//       Object.keys(this.state.allMonthListobj).map((item) => {
//         let objLocal={
//           name:item,
//           values:parseInt(this.state.allMonthListobj[item])
//         };
//         obj.list.push(objLocal);
//       });
//
//       this.props.submitData(obj);
//       this.setState({cellName:'',openDialogue:false});
//
//    }
//
//    closeContent=()=>{
//      this.setState({addContent:false});
//    }
//
// 	render(){
//
//   var content=this.state.addContent?[
//       <Grid>
//         <Row style={{marginTop:'10px'}}>
//
//     <Col xs={2}  >
//           <DatePicker hintText="Start Date"
//             mode="landscape"
//           onChange={this.handleStatrtDate}/>
//     </Col>
//     <Col xs={2}  >
//       <DatePicker hintText="End Date" onChange={this.handleendDate}
//       mode="landscape"/>
//     </Col>
//     <Col xs={2} >
//       <FlatButton label="Genrate List" primary={true} onTouchTap={this.getTable}/>
//     </Col>
//     <Col xs={2} >
//         <FlatButton label="Cancel" primary={true} onTouchTap={this.closeContent}/>
//     </Col>
//   </Row>
//   <Row style={{marginTop:'10px'}}>
//     <Col xs={2}>
//       <DropDownMenu maxHeight={300} value={this.state.value}
//       onChange={this.handleDrpDwnChange}
//       style={{width:'150'}}
//       >
//         {this.state.items}
//       </DropDownMenu>
//     </Col>
//   </Row>
//     </Grid>]:null;
//
//     // let titleBar=<AppBar title="Month List" />;
// 		// const actions = [
//     //    <Divider style={{backgroundColor:'rgb(0, 188, 212)'}}/>,
//     //   <FlatButton
//     //     label="Cancel"
//     //     primary={true}
//     //     onTouchTap={this.handleClose}
//     //   />,
//     //   <FlatButton
//     //     label="Submit"
//     //     primary={true}
//     //     keyboardFocused={true}
//     //     onTouchTap={this.onAddingTitle}
//     //   />,
//     // ];
// 		return(
// 			<div>
//
// 			<FloatingActionButton style={style}
// 			onTouchTap={this.openDialogueBar}
// 			mini={true}>
//      		 <ContentAdd />
//    		 </FloatingActionButton>
//
//          {content}
//          {/* <GenrateMonth data ={this.state.totalMonthList}/> */}
//         {/* <Dialog
//           title={titleBar}
//           actions={actions}
//           open={this.state.openDialogue}
//           modal={true}
//           onRequestClose={this.handleClose}
//           contentStyle={customContentStyle}
//           autoScrollBodyContent={true}
//         >
//             {_.times(this.state.totalMonth, i =>
//                 <div key={i}>
//                        <TextField id={i}
//                             hintText="Enter Value"
//                             name={this.state.totalMonthList[i]}
//                             floatingLabelText={this.state.totalMonthList[i]}
//                             onBlur={this.handleBlur}
//                             onChange={this.handleTrackNameChange}
//                         />
//                         <br />
//                         </div>
//                     )}
//
//         </Dialog> */}
// 			</div>
// 			)
// 	}
// }
