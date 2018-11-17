import React from 'react'
import { connect } from 'react-redux'
import { default as actions } from '../../actions/index'

export const ProfileHOC = (WrappedComponent) => {
    const mapStateToProps = (state) => {
        return {
            loggedInUser: state.user.loggedInUser,
            currentUser: state.user.currentUser,
            favorites: state.favorites.favorites,
            authError: state.user.error,
            favoritesMessage: state.favorites.message
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            logout: () => dispatch(actions.logoutUser()),
            getAllFavorites: (username) => dispatch(actions.getAllFavorites(username)),
            getUser: (username) => dispatch(actions.getSingleUser(username)),
            addFavorite: (favorite) => dispatch(actions.addFavorite(favorite)),
            removeFavorite: (id) => dispatch(actions.removeFavorite(id)),
            editFavorite: (changes) => dispatch(actions.editFavorite(changes)),
            getSingleGif: (id) => dispatch(actions.singleGif(id))
        }
    }

    class Profile extends React.Component {
        render(){
            return(
                <WrappedComponent {...this.props}/>
            )
        }
    }

    const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile)

    return ConnectedProfile
}