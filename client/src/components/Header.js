import React, { Component } from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
import store from '../index'

class Header extends Component {
  renderContent(){
    switch (this.props.auth){
      case null:
        return <li>Checking...</li>
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        )
      default:
        return [
          <li key={1}><Payments /></li>,
          <li key={3} style={{ marginLeft: '15px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key={2}><a href="/api/logout">Logout</a></li>
        ]
    }
  }

  render() {
    // console.log("Global State: ",store.getState())
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="left brand-logo"
          >
            Dashboard
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
  const { auth } = state
  return {
    auth
  }
}

export default connect(mapStateToProps)(Header)
