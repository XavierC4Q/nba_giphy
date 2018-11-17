import * as types from '../types/favorites'

export const addFavorite = (favorite) => {
    return {
        type: types.ADD_FAVORITE,
        payload: favorite
    }
}

export const removeFavorite = (id) => {
    return {
        type: types.REMOVE_FAVORITE,
        payload: id
    }
}

export const editFavorite = (id) => {
    return {
        type: types.EDIT_FAVORITE,
        payload: id
    }
}

export const getAllFavorites = (favorites) => {
    return {
        type: types.GET_FAVORITES,
        payload: favorites
    }
}

export const favoritesError = (err) => {
    return {
        type: types.FAVORITES_ERROR,
        payload: err
    }
}