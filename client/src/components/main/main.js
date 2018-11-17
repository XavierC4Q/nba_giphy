import React from 'react'
import { Link } from 'react-router-dom'

class Main extends React.PureComponent {

    render(){
        return (
            <div>
                <nav>
                <Link to='/login'>Login Here</Link>
                {" "}
                <Link to='/register'>Register Here</Link>
                {" "}
                <Link to='/search'>Search Here</Link>
                </nav>
                <h2>Highlight Reels</h2>
                <div>
    
                </div>
            </div>
        )
    }
}

export default Main