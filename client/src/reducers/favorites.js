export default (state = {
    favorites: [],
    message: ''
}, action) => {
    switch(action.type){
        case 'ADD FAVORITE':
            return {
                ...state,
                message: 'Favorite added!',
                favorites: [...state.favorites, action.payload]
            }
        case 'REMOVE FAVORITE':
            return {
                ...state,
                message: 'Favorite removed',
                favorites: state.favorites.filter(fav => fav._id !== action.payload)
            }
        case 'EDIT FAVORITE':
            return {
                ...state,
                message: 'Changes made!'
            }
        case 'GET FAVORITES':
            return {
                ...state,
                message: '',
                favorites: action.payload
            }
        case 'FAVORITES ERROR':
            return {
                ...state,
                message: action.payload
            }
        default:
            return state
    }
}