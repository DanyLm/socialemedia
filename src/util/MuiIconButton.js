import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const MuiIconButton = (props) => {
	const {
		children,
		onClick,
		tip,
		btnClassName,
		tipClassName,
	} = props;

	return (
		<Tooltip title={tip} className={tipClassName}>
			<IconButton
				onClick={onClick}
				className={btnClassName}
			>
				{children}
			</IconButton>
		</Tooltip>
	);
};


MuiIconButton.propTypes = {
	children: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	tip: PropTypes.string.isRequired,
	btnClassName: PropTypes.string,
	tipClassName: PropTypes.string,
};

export default MuiIconButton;
