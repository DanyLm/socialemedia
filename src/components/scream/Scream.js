import React, { Component } from 'react'
import withStyles from '@material-ui/styles/withStyles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'

import MuiIconButton from '../../util/MuiIconButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'


dayjs.extend(relativeTime);

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    content: {
        padding: 25
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'
    }
}

class Scream extends Component {

    render() {
        const {
            classes,
            scream: {
                likeCount,
                commentCount,
                userImage,
                body,
                createdAt,
                screamId,
                userHandle
            },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props

        const deleteButton = authenticated && userHandle === handle ?
            (
                <DeleteScream screamId={screamId} />
            ) : null

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    image={userImage}
                    title="Profile image"
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to={`/users/${userHandle}`}
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>
                        {likeCount} likes
                    </span>
                    <MuiIconButton tip="comments">
                        <ChatIcon color="primary" />
                    </MuiIconButton>
                    <span>
                        {commentCount} comments
                    </span>
                    <ScreamDialog
                        screamId={screamId}
                        userHandle={userHandle}
                    />
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Scream))
