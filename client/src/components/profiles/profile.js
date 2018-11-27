import React from 'react'
import { withRouter } from 'react-router-dom'
import { ProfileHOC as HOC } from './profileHOC'
import LoggedIn from './loggedIn'
import UserPage from './userPage'

class Profile extends React.Component {

    componentDidMount(){
        const { username, getUser, getAllFavorites } = this.props
        getUser(username)
        getAllFavorites(username)
    }

    render(){
        const { 
            loggedInUser, 
            currentUser,  
            favorites,
            editFavorite,
            removeFavorite,
            getSingleGif,
            authError,
            favoritesMessage,
            logout
        } = this.props
        return(
            <div>
                {
                    currentUser ? 
                        loggedInUser ? 
                            loggedInUser.username === currentUser.username ? 
                            <LoggedIn 
                            user={loggedInUser}
                            favorites={favorites}
                            editFav={editFavorite}
                            removeFav={removeFavorite}
                            getSingleGif={getSingleGif}
                            authError={authError}
                            favoritesMessage={favoritesMessage}
                            logout={logout}
                            /> : 
                        <UserPage
                        user={currentUser}
                        favorites={favorites}
                        /> : 
                    <UserPage
                    user={currentUser}
                    favorites={favorites}
                    /> : 
                    'loading'
                }
            </div>
        )
    }
}

export default withRouter(HOC(Profile))