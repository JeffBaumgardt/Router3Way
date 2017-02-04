import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]
middleware.push(createLogger())

const store = createStore(reducer, applyMiddleware(...middleware))

const AppWrapper = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default AppWrapper
