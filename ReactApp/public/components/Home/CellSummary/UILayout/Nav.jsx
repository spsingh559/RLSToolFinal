import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router';

export default class Nav extends React.Component{

	state={
		openDrawer:false
	};

	handleClose = () => this.setState({openDrawer: false});

	handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});


	render(){

		return(
			<div>
			 <AppBar
             title="RLS Tool"
             iconClassNameRight="muidocs-icon-navigation-expand-more"
             onLeftIconButtonTouchTap={this.handleToggle}
             style={{position: "fixed",top:'0'}}
           />
           <Drawer
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={(openDrawer) => this.setState({openDrawer})}
        >
          <MenuItem onTouchTap={this.handleClose}>
           <Link to="/"> Home </Link>
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
						<Link to ="/dashboard"> Dashboard </Link>
          {/* <Link to ={"/dashboard/hello"}> Dashboard </Link> */}
          </MenuItem>
					<MenuItem onTouchTap={this.handleClose}>
          <Link to ="/settings">Settings</Link>
          </MenuItem>
					<MenuItem onTouchTap={this.handleClose}>
          <Link to ="/analytics">Analytic</Link>
          </MenuItem>
        </Drawer>
        </div>
			)
	}
}
