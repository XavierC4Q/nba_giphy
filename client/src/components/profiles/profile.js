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
        console.log(this.props)
        const { loggedInUser, currentUser } = this.props
        return(
            <div>
                {
                    currentUser ? 
                        loggedInUser ? 
                            loggedInUser.username === currentUser.username ? 
                            <LoggedIn /> : 
                        <UserPage/> : 
                    <UserPage/> : 
                    'loading'
                }
            </div>
        )
    }
}

export default withRouter(HOC(Profile))