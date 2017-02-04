import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers/'
import { Route, Redirect } from 'react-router-dom'

const store = createStore(reducer)

const AppWrapper = ({path}) => {
	return (
		<Provider store={store}>
            <div>
                <Route path={`${path}/`} exact render={() => <Redirect to={`${path}/SHOW_ALL`} />} />
                <Route path={`${path}/SHOW_ALL`} filter="SHOW_ALL" component={App} />
                <Route path={`${path}/SHOW_COMPLETED`} filter="SHOW_COMPLETED" component={App} />
                <Route path={`${path}/SHOW_ACTIVE`} filter="SHOW_ACTIVE" component={App} />
            </div>
		</Provider>

	)
}

export default AppWrapper
