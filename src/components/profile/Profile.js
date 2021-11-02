import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/styles/withStyles'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import EditDetails from './EditDetails'

// Mui stuff
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

import { logoutUser, uploadImage } from '../../redux/actions/userActions'
import MuiIconButton from '../../util/MuiIconButton'

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

    state = {
        ref: React.createRef()
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

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
                                <input
                                    ref={(ref) => this.state.ref = ref}
                                    type="file"
                                    id="image-upload"
                                    hidden="hidden"
                                    onChange={this.handleImageChange}
                                />
                                <MuiIconButton tip="Edit profile picture" onClick={() => this.state.ref.click()} btnClassName="button">
                                    <EditIcon color="primary" />
                                </MuiIconButton>
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
                            <MuiIconButton tip="Logout" onClick={this.handleLogout}>
                                <KeyboardReturnIcon color="primary" />
                            </MuiIconButton>
                            <EditDetails />
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

const mapActionToProps = { logoutUser, uploadImage }

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile))
