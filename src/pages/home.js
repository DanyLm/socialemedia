import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getScreams } from '../redux/actions/dataActions'

import Scream from '../components/Scream'
import Profile from '../components/Profile'


export class home extends Component {

    state = {
        screams: null
    }

    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map(row => <Scream key={row.screamId} scream={row} />)
        ) : <p>Loading...</p>

        return (
            <Grid container spacing={4}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getScreams
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(home)
