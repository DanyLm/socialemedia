import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

import MuiIconButton from '../../util/MuiIconButton';

// Mui stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


const styles = (theme) => ({
	...theme.spread,
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10,
		marginBottom: 10
	},
	progressSpinner: {
		position: 'absolute'
	},
	closeButton: {
		position: 'absolute',
		left: '91%',
		top: '6%'
	}
});

export class PostScream extends Component {

    state = {
    	open: false,
    	body: '',
    	errors: {}
    }

    componentDidUpdate = (prevProps) => {

    	if (!this.props.ui.errors && (!this.props.ui.loading && (this.props.ui.loading != prevProps.ui.loading))) {
    		this.setState({
    			open: false,
    			errors: {},
    			body: ''
    		});
    	}


    	if (this.props.ui.errors && (this.props.ui.errors != prevProps.ui.errors)) {
    		this.setState({ errors: this.props.ui.errors });
    	}
    }

    handleOpen = () => {
    	this.setState({
    		open: true
    	});
    }

    handleClose = () => {
    	this.props.clearErrors();
    	this.setState({
    		open: false,
    		errors: {},
    		body: ''
    	});
    }

    handleChange = ({ target: { name, value } }) => {
    	this.setState({
    		[name]: value
    	});
    }

    handleSubmit = (event) => {
    	const {
    		body,
    	} = this.state;

    	event.preventDefault();

    	this.props.postScream({ body: body });

    }

    render() {
    	const { errors, open } = this.state;
    	const { classes, ui: { loading } } = this.props;

    	return (
    		<>
    			<MuiIconButton
    				onClick={this.handleOpen}
    				tip="Post a Scream!"
    			>
    				<AddIcon />
    			</MuiIconButton>
    			<Dialog
    				open={open}
    				onClose={this.handleClose}
    				fullWidth
    				maxWidth="sm"
    			>
    				<MuiIconButton
    					tipClassName={classes.closeButton}
    					tip="Close"
    					onClick={this.handleClose}
    				>
    					<CloseIcon />
    				</MuiIconButton>
    				<DialogTitle>
                        Post a new Scream
    				</DialogTitle>
    				<DialogContent>
    					<form onSubmit={this.handleSubmit}>
    						<TextField
    							name="body"
    							type="text"
    							label="Scream"
    							multiline
    							rows={3}
    							placeholder="Put your scream here"
    							error={Boolean(errors.body)}
    							helperText={errors.body}
    							className={classes.textField}
    							onChange={this.handleChange}
    							fullWidth
    						/>
    						<Button
    							type="submit"
    							variant="contained"
    							color="primary"
    							className={classes.submitButton}
    							disabled={loading}
    						>
                                Submit
    							{
    								loading &&
                                    <CircularProgress size={30} className={classes.progressSpinner} />
    							}
    						</Button>
    					</form>
    				</DialogContent>
    			</Dialog>
    		</>
    	);
    }
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	ui: state.ui
});

const mapActionsToProps = {
	postScream,
	clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream));
