import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {

    state = {
    	profile: null,
    	screamId: this.props.match.params.screamId
    }

    componentDidMount() {
    	const handle = this.props.match.params.handle;

    	this.props.getUserData(handle);

    	axios.get(`/user/${handle}`)
    		.then(res => {
    			this.setState({
    				profile: res.data.user
    			});
    		})
    		.catch(err => console.error(err));
    }

    render() {

    	const { screams, loading } = this.props.data;
    	const { profile, screamId } = this.state;

    	const screamsMarkup = loading ? (
    		<ScreamSkeleton />
    	) : (
    		screams.length === 0 ? (
    			<p>No screams from this user</p>
    		) : !screamId ? (
    			screams.map(row => <Scream key={row.screamId} scream={row} />)
    		) : (
    			screams.map(row => {
    				return (
    					row.screamId !== screamId ?
    						<Scream key={row.screamId} scream={row} /> :
    						<Scream key={row.screamId} scream={row} openDialog />
    				);
    			})
    		)
    	);

    	return (
    		<Grid container spacing={4}>
    			<Grid item sm={8} xs={12}>
    				{screamsMarkup}
    			</Grid>
    			<Grid item sm={4} xs={12}>
    				{
    					profile === null ? (
    						<ProfileSkeleton />
    					) : (
    						<StaticProfile profile={profile} />
    					)
    				}
    			</Grid>
    		</Grid>
    	);
    }
}

const mapStateToProps = state => ({
	data: state.data
});

const mapActionsToProps = {
	getUserData
};

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired, 
	match: PropTypes.object,
};

export default connect(mapStateToProps, mapActionsToProps)(user);
