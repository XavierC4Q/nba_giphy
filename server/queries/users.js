import { Users as UserModel } from '../models/users'
import { loginUser, isAUser, registerUser } from '../helpers/authHelpers'
import { updateUser } from '../helpers/updateHelpers'
import { handleError, handleResponse } from '../helpers/requestHelpers'

export const login = (req, res) => {
    if(!req.session.passport) return loginUser(req, res)
    return handleResponse(false, 'User is logged in', null, 200, res)
}

export const register = async (req, res) => {
    const checkUser = await isAUser(req)

    if(!checkUser){
       registerUser(req, res)
    }
    else {
        handleResponse(false, checkUser, null, 200, res)
    }
}

export const logout = (req, res) => {
    req.session.destroy()
    handleResponse(true, 'Logged out success', null, 200, res)
}

export const isLoggedIn = async (req, res, next) => {
    const loggedInUser = req.session.passport

    if(loggedInUser){
        try {
            let user = await UserModel.findOne({ username: loggedInUser.user })
            handleResponse(true, 'Logged in user', user, 200, res)
        }
        catch(err){
            handleError(err, 500, 'MONGO COULD NOT FIND USER', 'Mongo', res)
        }
    }
    else {
        handleResponse(false, 'You are not logged in', null, 200, res)
    }
}

export const allUsers = async (req, res) => {
    try {
        let listOfUsers = await UserModel.find()
        handleResponse(true, 'List of users', listOfUsers, 200, res)
    }
    catch(err){
        handleError(err, 500, 'MONGO FAILED GETTING ALL USERS', 'Mongo', res)
    }
}

export const update = async (req, res) => {
    const { id, username, email, password } = req.body
    await updateUser(id, username, email, password, res)
}

export const getSingleUser = async (req, res) => {
    const { username } = req.params
    try {
        let user = await UserModel.find({ username: username })
        handleResponse(true, 'Single User', user, 200, res)
    }
    catch(err){
        handleError(err, 500, 'MONGO FAILED TO GET SINGLE USER', 'Mongo', res)
    }
}