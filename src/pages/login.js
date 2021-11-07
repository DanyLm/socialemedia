import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

// MUI stuff
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
	...theme.spread
});

export class login extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	static getDerivedStateFromProps(nextProps) {

		if (nextProps.ui.errors) {
			return ({ errors: nextProps.ui.errors });
		}

		return null;
	}

    handleSubmit = (event) => {
    	event.preventDefault();

    	const {
    		email,
    		password
    	} = this.state;

    	const userData = {
    		email: email,
    		password: password
    	};

    	this.props.loginUser(userData, this.props.history);

    }

    handleChange = ({ target: { name, value } }) => {
    	this.setState({
    		[name]: value
    	});
    }

    render() {

    	const {
    		classes,
    		ui: {
    			loading
    		}
    	} = this.props;

    	const {
    		password,
    		email,
    		errors
    	} = this.state;

    	return (
    		<Grid
    			container
    			direction="row"
    			alignItems="center"
    			justifyContent="center"
    			className={classes.form}
    		>
    			<Grid item>
    				<img src={AppIcon} alt="monkey" className={classes.image} />
    				<Typography variant="h4" className={classes.pageTitle}>
                        Login
    				</Typography>
    				<form noValidate onSubmit={this.handleSubmit}>
    					<TextField
    						className={classes.textField}
    						id="email"
    						helperText={errors.email}
    						error={Boolean(errors?.email)}
    						name="email"
    						autoComplete="email"
    						type="email"
    						label="Email"
    						value={email}
    						onChange={this.handleChange}
    						fullWidth
    					/>
    					<TextField
    						className={classes.textField}
    						id="password"
    						autoComplete="current-password"
    						helperText={errors.password}
    						error={Boolean(errors?.password)}
    						name="password"
    						type="password"
    						label="Password"
    						value={password}
    						onChange={this.handleChange}
    						fullWidth
    					/>
    					{
    						errors.general &&
                            <Typography variant="body2" className={classes.customError}>
                            	{errors.general}
                            </Typography>
    					}
    					<Button disabled={loading} className={classes.button} type="submit" variant="contained" color="primary">
                            Login {loading && <CircularProgress size={25} className={classes.progress} />}
    					</Button>
    					<br />
    					<br />
    					<small>
                            Dont have an account ? Sign up <Link to="/sign-up">here</Link>
    					</small>
    				</form>
    			</Grid>
    		</Grid>
    	);
    }
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
	history: PropTypes.func
};

const mapStateToProps = (state) => ({
	user: state.user,
	ui: state.ui
});

const mapActionsToProps = {
	loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
