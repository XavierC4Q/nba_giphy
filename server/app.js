import express from 'express'

require('dotenv').config()

import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import * as passportLocal from 'passport-local'
import morgan from 'morgan'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { Users as UserModel } from './models/users'
import UserRoutes from './routes/users'
import FavoriteRoutes from './routes/favorites'

const LocalStrategy = passportLocal.Strategy
const app = express()

mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(() => console.log(`localhost:${process.env.PORT}`))
mongoose.globalPromise = Promise

app.use(morgan('dev'))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET
  }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// PASSPORT LOCAL CONFIG 
passport.use(new LocalStrategy(UserModel.authenticate('local')))
passport.serializeUser(UserModel.serializeUser())
passport.deserializeUser(UserModel.deserializeUser())


// ROUTES
app.use('/user', UserRoutes)
app.use('/favorite', FavoriteRoutes)

// ERROR HANDLERS
app.use('*',(req, res, next) => {
  let err = new Error('INVALID ROUTE')
  err.status(404)
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ success: false, message: err })
})

const server = http.createServer(app)

server.listen(process.env.PORT)