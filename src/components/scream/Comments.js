import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	...theme.spread,
	commentImage: {
		maxWidth: '100%',
		height: 100,
		objectFit: 'cover',
		borderRadius: '50%',
	},
	commentData: {
		marginLeft: 20,
	},
});

class Comments extends Component {
	render() {
		const {classes, comments} = this.props;
		return (
			<Grid container>
				{
					comments.map(({body, userImage, userHandle, createdAt}, index) => {
						return (
							<React.Fragment key={createdAt + userHandle}>
								<Grid item sm={12}>
									<Grid container>
										<Grid item sm={2}>
											<img src={userImage} alt="comment" className={classes.commentImage} />
										</Grid>
										<Grid item sm={9}>
											<div className={classes.commentData}>
												<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
													{userHandle}
												</Typography>
												<Typography variant="body2" color="textSecondary">
													{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
												</Typography>
												<hr className={classes.invisibleSeparator} />
												<Typography variant="body1">
													{body}
												</Typography>
											</div>
										</Grid>
									</Grid>
								</Grid>
								{
									index !== comments.length - 1 &&
                                    <hr className={classes.visibleSeparator} />
								}
							</React.Fragment>
						);
					})
				}
			</Grid>
		);
	}
}


Comments.propTypes = {
	comments: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);
