import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';
import derivedTheme from './util/theme';
import jwtDecode from 'jwt-decode';

// Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';

// Componentes
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import axios from 'axios';

axios.defaults.baseURL = 'https://europe-west1-socialmedia-c5a99.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if (token) {
	const decodeToken = jwtDecode(token);
	if (decodeToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({type: SET_AUTHENTICATED});
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={createTheme(derivedTheme)}>
				<Provider store={store}>
					<Router>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute exact path="/login" component={login} />
								<AuthRoute exact path="/sign-up" component={signup} />
								<Route exact path="/users/:handle" component={user} />
								<Route
									exact
									path="/users/:handle/scream/:screamId"
									component={user}
								/>

							</Switch>
						</div>
					</Router>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
