import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} param0
 * @returns
 */
const AuthRoute = ({component: Component, authenticated, ...rest}) => (
	<Route
		{...rest}
		render={(props) =>
			authenticated === true ?
				<Redirect to='/' /> :
				<Component {...props} />
		}
	/>
);

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

AuthRoute.propTypes = {
	component: PropTypes.object,
	user: PropTypes.object,
	authenticated: PropTypes.bool,
};

export default connect(mapStateToProps)(AuthRoute);
