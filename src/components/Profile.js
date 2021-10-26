import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/styles/withStyles'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Mui stuff
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

export class Profile extends Component {
    render() {

        const {
            classes,
            user: {
                credentials: {
                    handle,
                    createdAt,
                    imageUrl,
                    bio,
                    website,
                    location,
                },
                loading, 
                authenticated
            }
        } = this.props

        let profileMarkup = loading ?
            <p>loading...</p> :
            (
                authenticated ?
                    <Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <img className="profile-image" src={imageUrl} alt="profile" />
                            </div>
                            <hr />
                            <div className="profile-details">
                                <MuiLink
                                    component={Link}
                                    to={`/users/${handle}`}
                                    color="primary"
                                    variant="h5">
                                    @{handle}
                                </MuiLink>
                                <hr />
                                {
                                    bio &&
                                    <Typography variant="body2">
                                        {bio}
                                    </Typography>
                                }
                                <hr />
                                {
                                    location &&
                                    <>
                                        <LocationOnIcon color="primary" /> <span>{location}</span>
                                        <hr />
                                    </>
                                }

                                {
                                    website &&
                                    <>
                                        <LinkIcon color="primary" /> <a href={website} target="_blank" rel="noopener noreferrer">
                                            {' '}{website}
                                        </a>
                                        <hr />
                                    </>
                                }
                                <CalendarTodayIcon color="primary" /> {' '}
                                <span>
                                    Joined {dayjs(createdAt).format('MMM YYYY')}
                                </span>
                            </div>
                        </div>
                    </Paper> :
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            No profile found, please login again
                        </Typography>
                        <div className={classes.buttons}>
                            <Button color="primary" component={Link} to={'/login'}>
                                Login
                            </Button>
                            <Button variant="contained" color="primary" component={Link} to={'/sign-up'}>
                                Signup
                            </Button>
                        </div>
                    </Paper>
            )

        return profileMarkup
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
