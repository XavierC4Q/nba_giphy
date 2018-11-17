import * as actions from '../actionCreators/giphy'
import {
    handleGiphySearch,
    handleSingleGif
} from '../data/giphy'
import {
    isNBAPlayer,
    isNBATeam
} from '../data/nba'

const handleData = (gifs) => {
    let data = gifs.map((entry) => {
        return {
            id: entry.id,
            title: entry.title,
            url: entry.images.original.url,
            width: entry.images.original.width,
            height: entry.images.original.height
        };
    });
    return data
}

export const searchGifs = (query, limit) => {
    return async (dispatch) => {
        const validNBA = isNBAPlayer(query) || isNBATeam(query)
        if (validNBA) {
            const results = await handleGiphySearch(query, limit)
            if (results) {
                const payload = handleData(results)
                dispatch(actions.searchForGifs(payload))
            } else {
                dispatch(actions.giphyRequestError('Giphy rejected the search. Check request'))
            }
        }
        else {
            dispatch(actions.giphySearchErrors('Not a player in the NBA or an NBA team'))
        }
    }
}

export const singleGif = (id) => {
    return async (dispatch) => {
        const results = await handleSingleGif(id)
        if (results) {
            const payload = handleData(results)
            dispatch(actions.singleGif(payload))
        } else {
            dispatch(actions.giphyRequestError('Giphy rejected your single gif search. Check your request'))
        }
    }
}