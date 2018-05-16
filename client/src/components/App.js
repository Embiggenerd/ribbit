import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import Landing from "./Landing"
import Dashboard from "./dashboard"
import BlogNew from "./blogs/BlogNew"
import BlogDetailContainer from "./blogs/BlogDetailContainer"
import UserContainer from "./users/UserContainer"
import Header from "./Header"
import ErrorData from "./error"
import Modal from 'react-modal';

Modal.setAppElement('body')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
    this.state = {
      showModal: false
    }
  }

  render() {
    console.log("app properrorasown...", this.props.error.hasOwnProperty("message"))
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">

            <Header />
            <Modal
              isOpen={this.props.error.hasOwnProperty('message')}
              style={customStyles}
              contentLabel="Error"
            >
              <ErrorData onClickHandler={this.props.clearError} error={this.props.error} />
            </Modal>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/users/:_id"
              render={props => (
                <UserContainer key={props.match.params._id} {...props} />
              )}
            />
            <Switch>
              <Route exact path="/blogs/new" component={BlogNew} />
              <Route
                strict
                path="/blogs/:_id"
                component={BlogDetailContainer}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
const mapStateToProps = ({error}) => ({
  error
})

export default connect(mapStateToProps, actions)(App)
