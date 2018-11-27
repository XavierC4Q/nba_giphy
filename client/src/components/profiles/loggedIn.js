import React from 'react'

class LoggedIn extends React.Component {
    render(){
        const {
            user,
            logout,
            editFav,
            removeFav,
            favorites,
            getSingleGif,
            authError,
            favoritesError
        } = this.props
        return (
            <div>
                <h1>LOGGED IN USER PAGE</h1>
            </div>
        )
    }
}

export default LoggedIn