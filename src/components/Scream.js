import React, { Component } from 'react'
import withStyles from '@material-ui/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

dayjs.extend(relativeTime);

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    content: {
        padding: 25
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'
    }
}

export class Scream extends Component {
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
            }
        } = this.props

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
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream)
