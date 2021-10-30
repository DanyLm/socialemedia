import axios from 'axios'
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER
} from '../types'

/**
 * 
 * @param {*} userData 
 * @param {*} history 
 * @returns 
 */
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    axios.post('/login', userData)
        .then(res => {

            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });

            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

/**
 * 
 * @param {*} userData 
 * @param {*} history 
 * @returns 
 */
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    axios.post('/sign-up', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

/**
 * 
 * @returns 
 */
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}

/**
 * 
 * @returns 
 */
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })

    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.error(err))
}

/**
 * 
 * @param {*} formData 
 * @returns 
 */
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post(`/user/image`, formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.err(err))
}


export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.error(err))
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}