import { Favorites as FavoritesModel } from '../models/favorites'
import { handleError, handleResponse } from '../helpers/requestHelpers'
import { updateFavorite } from '../helpers/updateHelpers'

export const allFavoritesByUsername = async (req, res) => {
    const { username } = req.params
    try {
        const allFavorites = await FavoritesModel.find({ username: username })
        handleResponse(true, `All ${username} favorites`, allFavorites, 200, res)
    }
    catch(err){
        handleError(err, 500, 'MONGO FAILED TO GET FAVORITES', 'Mongo', res)
    }
}

export const addFavorite = async (req, res) => {
    const { username, title, path, posted } = req.body 
    const newFavorite = new FavoritesModel({
            username,
            title,
            path,
            posted
    })

    try {
       await newFavorite.save()
       handleResponse(true, 'Favorite added', newFavorite, 200, res)
    }
    catch(err){
        handleError(err, 500, 'ERROR SAVING FAVORITE', 'Mongo', res)
    }
}

export const updateFave = async (req, res) => {
    const { id, title } = req.body
    await updateFavorite(id, title)
}

export const deleteFavorite = async (req, res) => {
    const { id } = req.body

    try {
        const deleted = await FavoritesModel.findByIdAndDelete(id)
        handleResponse(true, 'Deleted favorite', deleted, 200, res)
    }
    catch(err){
        handleError(err, 500, 'FAILED TO FIND AND DELETE FAVORITE', 'Mongo', res)
    }
}