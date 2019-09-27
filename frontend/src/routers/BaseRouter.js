import React from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import MainPage from '../pages/MainPage/index';
import LoginPage from '../pages/LoginPage/index';
import GoalPage from '../pages/GoalPage/index';
import GoalPageNew from '../pages/GoalPageNew/index';
import SomeComponent from '../components/SomeComponent';

const BaseRouter = props => {
  return (
		<BrowserRouter>
			<Switch>
				<Route path="/main" component={MainPage} />
				<Route path="/login" exact component={LoginPage} />
				<Route path="/goal/new" component={GoalPageNew} />
				<Route path="/goal/:id" component={GoalPage} />
				{/* DEFAULT REDIRECT */}
				<Route render={() => <Redirect to="/main" />} />
			</Switch>
		</BrowserRouter>

  );
}

export default BaseRouter;