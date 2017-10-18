import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import ParentComponent from './Home/CellSummary/UILayout/ParentComponent.jsx';
import MainApp from './Home/CellSummary/Project/MainApp.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Settings from './Settings/Settings.jsx';
import Analytic from './analytic/Analytic.jsx';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
ReactDOM.render(
	<MuiThemeProvider>
	<Router history ={hashHistory}>
	<Route path="/" component={ParentComponent}>
			<Route path="/dashboard" component={Dashboard} />
		<Route path="/settings" component={Settings} />
		<Route path="/analytics" component={Analytic} />
		<IndexRoute component={MainApp} />
	</Route>
	</Router>
	</MuiThemeProvider>,
 document.getElementById('BindMainComponent'));
