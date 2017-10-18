import React from 'react';
import ReactDOM from 'react-dom';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AddNewSummary from '.././AddNewSummary.jsx';
import AddNewSummaryTable from '.././AddNewSummaryTable.jsx';
import CellLoading from '../../CellLoading/CellLoading.jsx';
import CellConstruct from '../../CellConstruct/CellConstruct.jsx'

export default class StepperComponent extends React.Component{

	state = {
    finished: false,
    stepIndex: 0,
    cellData:[]
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  componentWillMount=()=>{
    $.ajax({
      url:'http://localhost:3000/api/v1/cellSummary/'+this.props.projectID,
      type:'GET',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Stepper (cellSummary) for get');
         console.log(data);
        //  console.log('before reverse');
        //  console.log(data.message);
        //  data.message.reverse();
        //  console.log('after reverse');
        //  console.log(data.message);
         // data.length>0?this.setState({addProjectStatus:false}):this.setState({addProjectStatus:true})
         this.setState({cellData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Stepper (cellSummary) Comp');
      }.bind(this)
    });
    console.log("CWM is called");
  }

  submitCellDetailInfo=(obj)=>{

    var currentState=this.state.cellData;
    console.log('inside Stepper for Cell Summary Component');
    $.ajax({
      url:'http://localhost:3000/api/v1/cellSummary',
      type:'POST',
      data:obj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Stepper for Cell Summary');
         console.log(data);
         var newPostData=currentState.concat([data.message]);
         this.setState({cellData:newPostData});
      }.bind(this),
      error:function(err){
         console.log('server not connected from Add role');
         this.setState({data:currentState});
      }.bind(this)
    });
  }

  editTblRow=(obj,_id)=>{
    var tmp=this.state.cellData;
    var dataCurrentState=this.state.cellData;
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
      url:'http://localhost:3000/api/v1/cellSummary',
      type:'PUT',
      data:obj,
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Stepper (cellSummary) for put');
         console.log(data.message);
         this.setState({cellData:dataCurrentState});
      }.bind(this),
      error:function(err){
          console.log('server not connected from Stepper (cellSummary) for put');
          this.setState({cellData:tmp});
      }.bind(this)
    });
  }

  removetTblRow=(_id)=>{
    var tmp=this.state.cellData;
    var dataCurrentState=this.state.cellData
    var index;
       for (var i = 0; i < dataCurrentState.length; i++) {
         if(dataCurrentState[i]._id==_id){
          // index=obj.cellID;
          var editData=dataCurrentState.splice(i,1);
          editData=null;
           break;
         }
       };

    $.ajax({
      url:'http://localhost:3000/api/v1/cellSummary/'+_id,
      type:'DELETE',
      contetntType:'application/json',
      success: function(data){
         console.log('server connected from Stepper (cellSummary) for remove');
         console.log(data);

       this.setState({cellData:dataCurrentState});
    // /       this.setState({roleData:data.message});
      }.bind(this),
      error:function(err){
        console.log('server not connected from Stepper (cellSummary) for remove');
        this.setState({cellData:tmp});
      }.bind(this)
    });
    // var currentData=this.state.cellData;
    //  for (var i = 0; i < currentData.length; i++) {
    //   if(currentData[i]._id==_id){
    //    // index=obj.cellID;
    //    var editData=currentData.splice(i,1);
    //    editData=null;
    //     break;
    //   }
    // };
    // this.setState({cellData:currentData});
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

	render(){

    const {finished, stepIndex} = this.state;

		return(

      <div style={{maxWidth: 'auto', maxHeight: 'auto', margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Add New Summary Detail</StepLabel>
            <StepContent>
            <AddNewSummary handleConstructSubmitData={this.submitCellDetailInfo}
            projectID={this.props.projectID}/>
            <AddNewSummaryTable cellData={this.state.cellData}
            editDetailTblRow ={this.editTblRow}
            removeDetailTblRow={this.removetTblRow}
            />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Cell Loading </StepLabel>
            <StepContent>
              <CellLoading projectID={this.props.projectID}/>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Add Cell Construct</StepLabel>
            <StepContent>
              <CellConstruct projectID={this.props.projectID}/>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
              RLS Step completed
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
           click here
          </a> to go back to start.
          </p>
        )}
      </div>

			);
	}
}
