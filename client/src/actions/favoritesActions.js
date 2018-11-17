import * as actions from '../actionCreators/favorites'
import axios from 'axios'

export const addFavorite = (favorite) => {
    return async (dispatch) => {
        const { title, path, posted, username } = favorite
        try {
            const submitFav = await axios.post('/favorite/add', {
                title,
                path,
                posted,
                username
            })
            dispatch(actions.addFavorite(submitFav))
        }
        catch(err){
            dispatch(actions.favoritesError(err.message))
        }
    }
}

export const removeFavorite = (id) => {
    return async (dispatch) => {
        try {
            const confirmRemoval = await axios.delete('/favorite/delete', { id })
            dispatch(actions.removeFavorite(id))
        }
        catch(err){
            dispatch(actions.favoritesError(err.message))
        }
    }
}

export const editFavorite = (changes) => {
    const { id, title } = changes
    return async (dispatch) => {
        try {
            const updatedFav = await axios.patch('/favorite/update', {
                id, 
                title
            })
            dispatch(actions.editFavorite())
        }
        catch(err){
            dispatch(actions.favoritesError(err.message))
        }
    }
}

export const getAllFavorites = (username) => {
    return async (dispatch) => {
        try {
            const allFavorites = await axios.get(`/favorite/all/${username}`)
            dispatch(actions.getAllFavorites(allFavorites.data.data[0]))
        }
        catch(err){
            dispatch(actions.favoritesError(err.message))
        }
    }
}