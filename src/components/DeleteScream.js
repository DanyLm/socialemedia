import React, { Component } from 'react'
import withStyles from '@material-ui/styles/withStyles'
import PropTypes from 'prop-types'
import MuiIconButton from '../util/MuiIconButton'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

import { connect } from 'react-redux'
import { deleteScream } from '../redux/actions/dataActions'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%', 
        top: '10%'
    }
}

export class DeleteScream extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
        this.handleClose()
    }

    render() {
        const { classes } = this.props
        const { open } = this.state
        return (
            <>
                <MuiIconButton
                    tip="Delete Scream"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutlineIcon color="secondary" />
                </MuiIconButton>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure to delete this scream ?
                    </DialogTitle>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button color="secondary" onClick={this.deleteScream}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapActionsToProps = {
    deleteScream
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)((withStyles)(styles)(DeleteScream))
