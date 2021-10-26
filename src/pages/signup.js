import React, { Component } from 'react'
import withStyles from '@material-ui/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom'

// MUI stuff
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spread
})

export class signup extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps) {

        if (nextProps.ui.errors) {
            return ({ errors: nextProps.ui.errors })
        }

        return null
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {
            email,
            password,
            confirmPassword,
            handle
        } = this.state

        const newUserData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            handle: handle,
        }


        this.props.signupUser(newUserData, this.props.history)

    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    }

    render() {

        const {
            classes,
            ui: {
                loading
            }
        } = this.props

        const {
            password,
            confirmPassword,
            handle,
            email,
            errors
        } = this.state

        return (
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={classes.form}
            >
                <Grid item>
                    <img src={AppIcon} alt="monkey" className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            className={classes.textField}
                            id="email"
                            helperText={errors.email}
                            error={Boolean(errors?.email)}
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="email"
                            value={email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            className={classes.textField}
                            id="password"
                            helperText={errors.password}
                            error={Boolean(errors?.password)}
                            name="password"
                            type="password"
                            label="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            className={classes.textField}
                            id="confirmPassword"
                            helperText={errors.confirmPassword}
                            error={Boolean(errors?.confirmPassword)}
                            name="confirmPassword"
                            type="password"
                            label="Confirm password"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            className={classes.textField}
                            id="handle"
                            helperText={errors.handle}
                            error={Boolean(errors?.handle)}
                            name="handle"
                            type="text"
                            autoComplete="nickname"
                            label="Handle"
                            value={handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {
                            errors.general &&
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        }
                        <Button disabled={loading} className={classes.button} type="submit" variant="contained" color="primary">
                            Signup {loading && <CircularProgress size={25} className={classes.progress} />}
                        </Button>
                        <br />
                        <br />
                        <small>
                            Already have an account ? Login <Link to="/login">here</Link>
                        </small>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup))
