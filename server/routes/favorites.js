import express, { Router } from 'express'
import * as queries from '../queries/favorites'
import { loginRequired } from '../helpers/authHelpers'

const FavoriteRoutes = Router()

FavoriteRoutes.get('/all/:username', queries.allFavoritesByUsername)
FavoriteRoutes.post('/add', loginRequired, queries.addFavorite)
FavoriteRoutes.patch('/update', loginRequired, queries.updateFave)
FavoriteRoutes.delete('/delete', loginRequired, queries.deleteFavorite)

module.exports = FavoriteRoutes