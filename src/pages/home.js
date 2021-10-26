import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

export class home extends Component {

    state = {
        screams: null
    }

    componentDidMount() {
        axios.get('/screams')
            .then(res => res.data)
            .then(data => {
                return this.setState({
                    screams: data
                })
            })
            .catch(err => console.error(err))

    }

    render() {

        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(row => <Scream key={row.screamId} scream={row} />)
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

export default home
