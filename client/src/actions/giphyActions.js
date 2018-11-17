import * as actions from '../actionCreators/giphy'
import { handleGiphySearch, handleSingleGif } from '../data/giphy'

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
        const results = await handleGiphySearch(query, limit)
        if(results){
            const payload = handleData(results)
            dispatch(actions.searchForGifs(payload))
        }
        else {
            dispatch(actions.giphySearchErrors('Giphy rejected the search. Check request'))
        }
    }
}

export const singleGif = (id) => {
    return async (dispatch) => {
        const results = await handleSingleGif(id)
        if(results){
            const payload = handleData(results)
            dispatch(actions.singleGif(payload))
        }
        else {
            dispatch(actions.giphySearchErrors('Giphy rejected your single gif search. Check your request'))
        }
    }
}

