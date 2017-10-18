import React from 'react';
import EachRoleDisplay from './EachRoleDisplay.jsx';
export default class DisplayRole extends React.Component{

  chipDltRequest=(_id)=>{
    this.props.chipDltRequest(_id);
  }

  editRoleName=(obj,_id)=>{
    this.props.editRoleName(obj,_id);
  }

  render(){

    var projectData = this.props.roleData.map(function(data) {
        return (
          <div key={data._id}>
          <EachRoleDisplay
          roleName={data.roleName}
          _id={data._id}
          chipDltRequest={this.chipDltRequest}
          editRoleName={this.editRoleName}
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
