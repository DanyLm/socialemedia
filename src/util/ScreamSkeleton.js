import React, { Component } from 'react'
import NoImg from '../images/no-img.png'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/styles/WithStyles'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginBottom: 10
    }
})



const ScreamSkeleton = (props) => {

    const { classes } = props

    return (
        <>
            {
                Array.from({ length: 5 }).map((item, index) => (
                    <Card className={classes.card} key={index}>
                        <CardMedia className={classes.cover} image={NoImg} />
                        <CardContent className={classes.cardContent}>
                            <div className={classes.handle} />
                            <div className={classes.date} />
                            <div className={classes.fullLine} />
                            <div className={classes.fullLine} />
                            <div className={classes.halfLine} />
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ScreamSkeleton)
