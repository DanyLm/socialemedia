import React, { Component } from 'react'
import MuiIconButton from '../../util/MuiIconButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'


export class LikeButton extends Component {

    likedScream = () => {
        return (
            this.props.user.likes &&
            this.props.user.likes.find(
                like => like.screamId === this.props.screamId
            )
        )
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }


    render() {

        const { authenticated } = this.props.user

        return (
            <>
                {
                    !authenticated ?
                        (
                            <Link to="/login">
                                <MuiIconButton tip="Like">
                                    <FavoriteBorderIcon color="primary" />
                                </MuiIconButton>
                            </Link>
                        ) :
                        (
                            this.likedScream() ?
                                (
                                    <MuiIconButton tip="Undo like" onClick={this.unlikeScream}>
                                        <FavoriteIcon color="primary" />
                                    </MuiIconButton>
                                ) :
                                (
                                    <MuiIconButton tip="Like" onClick={this.likeScream}>
                                        <FavoriteBorderIcon color="primary" />
                                    </MuiIconButton>
                                )
                        )
                }
            </>
        )
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
