import * as types from '../types/user'

export const login = (user) => {
    return {
        type: types.LOGIN,
        payload: user
    }
}

export const register = (user) => {
    return {
        type: types.REGISTER,
        payload: user
    }
}

export const isLoggedIn = (user) => {
    return {
        type: types.IS_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export const getSingleUser = (user) => {
    return {
        type: types.SINGLE_USER,
        payload: user
    }
}

export const getAllUsers = (users) => {
    return {
        type: types.ALL_USERS,
        payload: users
    }
}

export const userError = (err) => {
    return {
        type: types.USER_ERROR,
        payload: err
    }
}