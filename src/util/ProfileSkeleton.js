import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import NoImg from '../images/no-img.png'

import Paper from '@material-ui/core/Paper'

// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = theme => ({
    ...theme.spread,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto',
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '50%',
        marginBottom: 10
    }
})

const ProfileSkeleton = (props) => {

    const { classes } = props

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image" />
                </div>
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOnIcon color="primary" />
                    <span>
                        Location
                    </span>
                    <hr />
                    <LinkIcon color="primary" /> https://website.com
                    <hr />
                    <CalendarTodayIcon color="primary" /> Joined date
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
