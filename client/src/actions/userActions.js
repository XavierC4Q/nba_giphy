import * as actions from '../actionCreators/users'
import axios from 'axios'

export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const attemptLogin = await axios.post('/user/login',{
                username,
                password
            })
            dispatch(actions.login(attemptLogin.data.data))
        }
        catch(err){
            dispatch(actions.userError(err.message))
        }
    }
}

export const isLoggedIn = () => {
    return async (dispatch) => {
        try {
            const checkLoggedIn = await axios.get('/user/isLoggedIn')
            dispatch(actions.isLoggedIn(checkLoggedIn.data.data))
        }
        catch(err){
            dispatch(actions.userError(err.message))
        }
    }
}

export const registerUser = (username, password, email, confirmPassword, confirmEmail) => {
    return async (dispatch) => {
        try {
            const attemptRegister = await axios.post('/user/register', {
                username,
                password,
                email
            })

            dispatch(actions.register(attemptRegister.data.data))
        }
        catch(err){
            dispatch(actions.userError(err.message))
        }
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        axios.get('/user/logout')
        .then(() => dispatch(actions.logout()))
        .catch(err => dispatch(actions.userError(err.message)))
    }
}

export const getSingleUser = (username) => {
    return async (dispatch) => {
        try {
            const user = await axios.get(`/user/single/${username}`)
            dispatch(actions.getSingleUser(user.data.data[0]))
        }
        catch(err){
            dispatch(actions.userError(err.message))
        }
    }
}

