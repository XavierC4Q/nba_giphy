import React from 'react'
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { default as actions } from './actions/index'

import Main from './components/main/main'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Search from './components/search/search'
import Profile from './components/profiles/profile'

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
        error: state.user.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkLoggedIn: () => dispatch(actions.isLoggedIn())
    }
}

class App extends React.Component {
    componentDidMount() {
        this.props.checkLoggedIn()
    }   
    render() { 
        const { loggedInUser } = this.props
        return (<div>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/search' component={Search}/>
            <Route path='/profile/:username' render={(props) => {
                const { username } = props.match.params
                return(<Profile username={username}/>)
            }}/>
            <Route exact path='/' render={() => <Main loggedInUser={loggedInUser}/>}/>
        </div>)
    }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));