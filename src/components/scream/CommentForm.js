import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

// Mui stuff

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// redux

import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
	...theme.spread,
	form: {
		marginBottom: 30
	}
});

export class CommentForm extends Component {

    state = {
    	submit: false,
    	body: '',
    	errors: {}
    }

    componentDidUpdate = (prevProps, prevState) => {

    	if (this.state.submit && (this.state.submit != prevState.submit)) {
    		this.setState({ body: '', submit: false });
    	}

    	if (this.props.ui.errors != prevProps.ui.errors) {
    		this.setState({ errors: this.props.ui.errors ?? {} });
    	}

    }

    handleChange = ({ target: { name, value } }) => {
    	this.setState({
    		[name]: value
    	});
    }

    handleSubmit = (event) => {
    	const { body } = this.state;
    	event.preventDefault();
    	this.props.submitComment(this.props.screamId, { body: body });
    	this.setState({ submit: true });
    }

    render() {

    	const {
    		classes,
    		authenticated
    	} = this.props;

    	const {
    		errors,
    		body
    	} = this.state;

    	return authenticated ?
    		(
    			<Grid item sm={12} style={{ textAlign: 'center' }}>
    				<form onSubmit={this.handleSubmit} className={classes.form}>
    					<TextField
    						name="body"
    						type="text"
    						variant="outlined"
    						label="Comment on scream"
    						error={errors.comment}
    						helperText={errors.comment}
    						value={body}
    						onChange={this.handleChange}
    						fullWidth
    						className={classes.textField}
    						multiline
    						rows={3}
    					/>
    					<Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Submit
    					</Button>
    				</form>
    				<hr className={classes.visibleSeparator} />
    			</Grid>
    		) : null;

    }
}

const mapStateToProps = (state) => ({
	ui: state.ui,
	authenticated: state.user.authenticated
});

const mapActionsToProps = {
	submitComment
};

CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));
