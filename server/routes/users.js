import express, { Router } from 'express'
import * as queries from '../queries/users'
import { loginRequired } from '../helpers/authHelpers'

const UserRoutes = Router()

UserRoutes.get('/all', queries.allUsers)
UserRoutes.get('/single/:username', queries.getSingleUser)
UserRoutes.get('/isLoggedIn', queries.isLoggedIn)
UserRoutes.get('/logout', loginRequired, queries.logout)
UserRoutes.post('/login', queries.login)
UserRoutes.post('/register', queries.register)
UserRoutes.patch('/update', loginRequired, queries.update)

module.exports = UserRoutes