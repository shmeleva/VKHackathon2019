import React from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect , NavLink} from 'react-router-dom';
import MainPage from '../pages/MainPage/index';
import LoginPage from '../pages/LoginPage/index';
import WelcomePage from '../pages/WelcomePage/index';
import GoalPage from '../pages/GoalPage/index';
import GoalPageNew from '../pages/GoalPageNew/index';
import SomeComponent from '../components/SomeComponent';
import axios from "axios";
import DonatePage from '../pages/DonatePage';

class BaseRouter extends React.Component {
	// let auth = true;
	// const checkAuth = () => {
	// 	axios.get('http://localhost:3000/profile', {
	// 		withCredentials: true
	// 	}).catch(error => {
	// 		auth = false;
	// 	}).then(response => {
	// 		console.log("Auth? ", auth);
	// 	});
	// }
	// checkAuth();

<<<<<<< HEAD
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/login" exact component={LoginPage} />
					<Route path="/goal/:id" component={GoalPage} />
	
					<Route path="/main" component={MainPage} />
					<Route path="/welcome" component={WelcomePage} />
					<Route path="/goal/new" component={GoalPageNew} />
					{/* DEFAULT REDIRECT */}
					<Route render={() => <Redirect to="/main" />} />
				</Switch>
			</BrowserRouter>
		);
	}
=======
				<Route path="/main" component={MainPage} />
				<Route path="/welcome" component={WelcomePage} />
				<Route path="/goal/new" component={GoalPageNew} />
				<Route path="/donate/:id" component={DonatePage} />
				{/* DEFAULT REDIRECT */}
				<Route render={() => <Redirect to="/main" />} />
			</Switch>
		</BrowserRouter>

  );
>>>>>>> merge
}

export default BaseRouter;