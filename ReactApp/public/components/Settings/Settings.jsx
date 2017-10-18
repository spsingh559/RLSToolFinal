import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import AddTrack from './Track/AddTrack.jsx';
import AddRole from './Role/AddRole.jsx';
export default class Settings extends React.Component{
  // state={
  //   trackData=[{id:0,trackName:'ID_S'}];
  // }
  roleList=(roleName)=>{
    console.log(roleName);
  }

  render(){

    return(
      <div>
      <Grid>
        <Row style={{marginTop:'100px'}}>
         <Col xs={4}><AddTrack /></Col>
         <Col xs={4}><AddRole /> </Col>


    </Row>
    </Grid>
    </div>
    )
  }
}
