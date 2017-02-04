import React from 'react'
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Link from 'react-router-dom/Link'
import App1 from './App1'
import App2 from './App2'
import 'todomvc-app-css/index.css'

const AppWrapper = () => (
  <Router>
    <div>
        <ul>
            <li><Link to="/app1">App1</Link></li>
            <li><Link to="/app2">App2</Link></li>
        </ul>
        <Switch>
            <Route exact path="/" render={() => ( <h1>Welcome</h1> )}/>
            <Route path="/app1" component={App1}/>
            <Route path='/app2' component={App2}/>
        </Switch>
    </div>
  </Router>
)


export default AppWrapper
