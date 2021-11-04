import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// Mui stuff
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

// Redux

import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions'

dayjs.extend(relativeTime);

class Notifications extends Component {

    state = {
        anchorEl: null
    }

    handleOpen = ({ target }) => {
        this.setState({
            anchorEl: target
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    onMenuOpened = () => {
        let readNotifications = this.props.notifications
            .filter(row => row.read)
            .map(row => row.notificationId);

        this.props.markNotificationsRead(readNotifications)
    }

    render() {
        const { notifications } = this.props
        const { anchorEl } = this.state

        let notificationsIcon;

        if (notifications && notifications.length > 0) {
            notifications.filter(row => row.read === false).length > 0 ?
                notificationsIcon = (
                    <Badge
                        badgeContent={notifications.filter(row => row.read === false).length}
                        color="secondary"
                    >
                        <NotificationsIcon />
                    </Badge>
                ) : (
                    notificationsIcon = <NotificationsIcon />
                )
        } else {
            notificationsIcon = <NotificationsIcon />
        }


        let notificationsMarkup = notifications && notifications.length > 0 ?
            (
                notifications.map(({ type, createdAt, read, recipient, sender, screamId }) => {
                    const verb = type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(createdAt).fromNow();
                    const iconColor = read ? 'primary' : 'secondary';
                    const icon = type === 'like' ?
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} /> :
                        <ChatIcon color={iconColor} style={{ marginRight: 10 }} />

                    return (
                        <MenuItem key={createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                variant="body1"
                                color="textPrimary"
                                to={`/users/${recipient}/scream/${screamId}`}
                            >
                                {sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )

        return (
            <>
                <Tooltip title="Notifcations">
                    <IconButton
                        onClick={this.handleOpen}
                        aria-haspopup="true"
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </>
        )
    }
}


Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications)
