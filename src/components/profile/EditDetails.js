import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/styles/withStyles'

// Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

import MuiIconButton from '../../util/MuiIconButton'

// Mui stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    ...theme.spread,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount() {
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    mapUserDetailsToState = (credentials) => {

        const { bio, website, location } = credentials

        this.setState({
            bio: bio ?? '',
            website: website ?? '',
            location: location ?? '',
        })
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        }

        this.props.editUserDetails(userDetails)
        this.handleClose();
    }

    render() {
        const { classes } = this.props
        const {
            bio, website, location
        } = this.state

        return (
            <>
                <MuiIconButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MuiIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        Edit your details
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows={3}
                                placeholder="A short bio about my self"
                                className={classes.textField}
                                value={bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="https://www.myprofessionalwebsite.com"
                                className={classes.textField}
                                value={website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where I live"
                                className={classes.textField}
                                value={location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
})

const mapActionsToProps = {
    editUserDetails
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))
