import React from 'react'
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import App1 from './App1'
import 'todomvc-app-css/index.css'

const AppWrapper = () => (
  <Router>
    <div>
      <Route exact path="/" render={() => ( <h1>Welcome</h1> )}/>
      <Route path="/app1" component={App1}/>
    </div>
  </Router>
)


export default AppWrapper
