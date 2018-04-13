import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Landing from './Landing'
import Dashboard from './dashboard'
import BlogNew from './blogs/BlogNew'
import BlogDetailContainer from './blogs/BlogDetailContainer'

import Header from './Header'
import SurveyNew from './surveys/SurveyNew'

class App extends Component{
  componentDidMount() {
    this.props.fetchUser()
  }

  render(){
    return(
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/blogs" component={Dashboard} />
            <Switch><Route exact path="/blogs/new" component={BlogNew} />

            <Route
              strict
              path="/blogs/:_id"
              component={BlogDetailContainer}
            /></Switch>
          </div>
        </BrowserRouter>

      </div>
    )
  }
}

export default connect(null, actions)(App)
