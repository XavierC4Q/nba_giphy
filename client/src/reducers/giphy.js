export default (state = {
    requestedGifs: [],
    singleGif: [],
    searchError: '',
    requestError: ''
}, action) => {
    switch (action.type) {
        case 'GIPHY SEARCH':
            return {
                ...state,
                requestedGifs: action.payload
            }
        case 'GIPHY SEARCH ERROR':
            return {
                ...state,
                searchError: action.payload
            }
        case 'SINGLE GIF':
            return {
                ...state,
                singleGif: action.payload
            }
        case 'SINGLE GIF ERROR':
            return {
                ...state,
                searchError: action.payload
            }
        case 'GIPHY REQUEST ERROR':
            return {
                ...state,
                requestError: action.payload
            }
        default:
            return state
    }
}