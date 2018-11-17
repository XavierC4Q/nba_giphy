import * as userActions from './userActions'
import * as giphyActions from './giphyActions'
import * as favoriteActions from './favoritesActions'

export default {
    ...userActions,
    ...giphyActions,
    ...favoriteActions
}