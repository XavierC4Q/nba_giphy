export default (
    state = { 
    currentUser: false,
    loggedInUser: false,
    allUsers: [], 
    error: false 
}, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                loggedInUser: action.payload
            }
        case 'REGISTER':
            return {
                ...state,
                loggedInUser: action.payload
            }
        case 'IS LOGGED IN':
            return {
                ...state,
                loggedInUser: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                loggedInUser: false
            }
        case 'SINGLE USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'ALL USERS':
            return {
                ...state,
                allUsers: action.payload
            }
        case 'USER ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}