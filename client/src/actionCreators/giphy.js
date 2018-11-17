import * as types from '../types/giphy'

export const searchForGifs = (results) => {
    return {
        type: types.GIPHY_SEARCH,
        payload: results
    }
}

export const singleGif = (gif) => {
    return {
        type: types.SINGLE_GIF,
        payload: gif
    }
}

export const giphySearchErrors = (error) => {
    return {
        type: types.GIPHY_SEARCH_ERROR,
        payload: error
    }
}

export const giphyRequestError = (error) => {
    return {
        type: types.GIPHY_REQUEST_ERROR,
        payload: error
    }
}