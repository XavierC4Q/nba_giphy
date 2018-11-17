import React from 'react'
import ReactDOM from 'react-dom'
import { configStore } from './store'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'

const root = document.getElementById('app')
const store = configStore()

ReactDOM.render(
<ReduxProvider store={store}>
<BrowserRouter>
    <App/>
</BrowserRouter>
</ReduxProvider>, root)

module.hot.accept(App)