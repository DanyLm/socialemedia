import {
	SET_SCREAM,
	SET_SCREAMS,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	LOADING_DATA,
	DELETE_SCREAM,
	POST_SCREAM,
	SUBMIT_COMMENT,
} from '../types';

const initialState = {
	screams: [],
	scream: {},
	loading: false,
};

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export default function(state = initialState, action) {
	switch (action.type) {
	case LOADING_DATA:
		return {
			...state,
			loading: true,
		};
	case SET_SCREAM:
		return {
			...state,
			scream: action.payload,
			loading: false,
		};
	case SET_SCREAMS:
		return {
			...state,
			screams: action.payload,
			loading: false,
		};
	case LIKE_SCREAM:
	case UNLIKE_SCREAM:

		state.screams[state.screams.findIndex(
			(scream) => scream.screamId === action.payload.screamId,
		)] = action.payload;

		if (state.scream.screamId === action.payload.screamId) {
			state.scream = {
				...action.payload,
				comments: [
					...state.scream.comments,
				],
			};
		}

		return {
			...state,
		};
	case DELETE_SCREAM:
		state.screams.splice(
			state.screams.findIndex(
				(scream) => scream.screamId === action.payload,
			),
			1,
		);
		return {
			...state,
		};
	case POST_SCREAM:
		return {
			...state,
			screams: [
				action.payload,
				...state.screams,
			],
		};
	case SUBMIT_COMMENT:
		return {
			...state,
			scream: {
				...state.scream,
				commentCount: state.scream.commentCount + 1,
				comments: [action.payload, ...state.scream.comments],
			},
		};
	default:
		return state;
	}
}
