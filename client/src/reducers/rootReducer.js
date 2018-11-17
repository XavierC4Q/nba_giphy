import { combineReducers } from 'redux'
import user from './user'
import giphy from './giphy'
import favorites from './favorites'

export default combineReducers({
    user,
    giphy,
    favorites
})
