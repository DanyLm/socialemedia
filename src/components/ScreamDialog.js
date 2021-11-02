import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/styles/withStyles'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getScream } from '../redux/actions/dataActions'

// My components
import LikeButton from './LikeButton'
import MuiIconButton from '../util/MuiIconButton'

// Mui

import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat'


const styles = (theme) => ({
    ...theme.spread,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    inivisibleSeparator: {
        border: 'none',
        margin: 4
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    dialogContent: {
        padding: 20,
    },
    circularProgress: {
        margin: 'auto'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    }
})

class ScreamDialog extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {

        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle
            },
            ui: {
                loading
            }
        } = this.props

        const { open } = this.state

        const dialogMarkup = loading ?
            (<CircularProgress thickness={2} size={100} />) :
            (
                <Grid container>
                    <Grid item sm={5}>
                        <img src={userImage} alt="" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr className={classes.inivisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.inivisibleSeparator} />
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
                    </Grid>
                </Grid>
            )

        return (
            <>
                <MuiIconButton
                    tip="Expand scream"
                    tipClassName={classes.expandButton}
                    onClick={this.handleOpen}
                >
                    <UnfoldMoreIcon color="primary" />
                </MuiIconButton>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MuiIconButton
                        tipClassName={classes.closeButton}
                        tip="Close"
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </MuiIconButton>
                    <DialogContent className={clsx(classes.dialogContent, {
                        [classes.circularProgress]: loading
                    })}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    ui: state.ui
})

const mapActionsToProps = {
    getScream
}

export default connect(mapStateToProps, mapActionsToProps)((withStyles)(styles)(ScreamDialog))
