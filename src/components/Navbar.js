import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// My stuff
import MuiIconButton from '../util/MuiIconButton';
import PostScream from './PostScream';

// Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

export class Navbar extends Component {
    render() {

        const { authenticated } = this.props

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {
                        authenticated ?
                            <>
                                <PostScream />
                                <Link to='/'>
                                    <MuiIconButton tip="Home">
                                        <HomeIcon />
                                    </MuiIconButton>
                                </Link>
                                <MuiIconButton tip="Notifications">
                                    <NotificationsIcon />
                                </MuiIconButton>
                            </>
                            :
                            <>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="sign-up">
                                    Signup
                                </Button>
                            </>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Navbar)
