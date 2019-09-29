import React from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect, NavLink, browserHistory } from 'react-router-dom';
import MainPage from '../pages/MainPage/index';
import LoginPage from '../pages/LoginPage/index';
import WelcomePage from '../pages/WelcomePage/index';
import GoalPage from '../pages/GoalPage/index';
import GoalPageNew from '../pages/GoalPageNew/index';
import SomeComponent from '../components/SomeComponent';
import axios from "axios";
import DonatePage from '../pages/DonatePage';

class BaseRouter extends React.Component {
	render() {
		return (
			<BrowserRouter history={browserHistory}>
				<Switch>
					<Route path="/login" exact component={LoginPage} />
					<Route path="/goal/new" component={GoalPageNew} />
					<Route path="/goal/:id" component={GoalPage} />
					<Route path="/donate/:id" component={DonatePage} />

					<Route path="/main" component={MainPage} />
					<Route path="/welcome" component={WelcomePage} />
					{/* DEFAULT REDIRECT */}
					<Route render={() => <Redirect to="/main" />} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default BaseRouter;