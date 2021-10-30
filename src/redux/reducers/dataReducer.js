import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM } from '../types'

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            state.screams[state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)] = action.payload;
            return {
                ...state
            }
        case DELETE_SCREAM:
            state.screams.splice(
                state.screams.findIndex((scream) => scream.screamId === action.payload),
                1
            )

            return {
                ...state
            }
        default:
            return state
    }
}