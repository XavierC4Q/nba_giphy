import { Users as UserModel } from '../models/users'
import { handleResponse, handleError } from './requestHelpers'

const checkUser = async (username, email) => {
    const usernameTaken = await UserModel.findOne({ username: username });
    const emailTaken = await UserModel.findOne({ email: email });
    return { usernameTaken, emailTaken };
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body

   const auth = new Promise((resolve, reject) => {
       UserModel.authenticate()(username, password, (err, user) => {
           if(err){
               reject({ 
                   message: 'ERROR AUTHENTICATING USER',
                   type: 'Passport'
            })
           }
           if(!user){
               reject({
                   message: 'NOT A USER',
               })
           }
           req.login(user, (error) => {
               if(error){
                   reject({
                       message: 'ERROR LOGGING IN',
                       type: 'Passport'
                   })
               }
               resolve({
                   message: 'Logged in success',
                   data: user
               })
           })
       })
   })

   try {
       const loggedInUser = await Promise.resolve(auth)
       const info = {
           id: loggedInUser.data._id,
           username: loggedInUser.data.username,
           email: loggedInUser.data.email
       }
       handleResponse(true, 'Success', info, 200, res)
   }
   catch(err){
       handleError(err, 500, 'Failed to logged in', 'Passport', res)
   }
}

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body 
    const newUser = new UserModel({
        username,
        email
    })
    try {
        await newUser.setPassword(password)
        try {
            await newUser.save()
            loginUser(req, res)
        }
        catch(err){
            handleError(err, 500, 'MONGO FAILED TO SAVE USER', 'Mongo', res)
        }
    }
    catch(err){
        handleError(err, 500, 'PASSPORT FAILED SETTING PASSWORD', 'Passport', res)
    }
}

export const isAUser = async (req) => {
    const { username, email } = req.body
    try {
        const { usernameTaken, emailTaken } = await checkUser(username, email);
        if(usernameTaken) return 'Username is taken'
        if(emailTaken) return 'Email is taken'
        return false
    }
    catch(err){
        handleError(err, 500, 'MONGO FAILED FINDING USER', 'Mongo', res) 
    }
}

export const loginRequired = (req, res, next) => {
    if(!req.session.passport){
        return handleResponse(false, 'LOGIN IS REQUIRED', null, 200, res)
    }
    return next()
}
