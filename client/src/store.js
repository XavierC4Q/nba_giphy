import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from './logger'
import rootReducer from './reducers/rootReducer'

export const configStore = () => {
    const middlewares = [logger,thunk]
    const enhancers = []

    const middlewareEnhancer = applyMiddleware(...middlewares)
    enhancers.push(middlewareEnhancer)

    const store = createStore(
        rootReducer, {},
        composeWithDevTools(...enhancers)
    )

    if (module.hot) {
        module.hot.accept('./reducers/rootReducer', () => store.replaceReducer(rootReducer))
    }

    return store
}