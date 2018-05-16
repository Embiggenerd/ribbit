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
          <li key={0}>{this.props.auth.displayName}</li>,
          <li key={1}><Payments /></li>,
          <li key={3}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key={2}><a href="/api/logout">Logout</a></li>,
          <li key={4}><Link
            to={'/dashboard'}
          >
            Dashboard
          </Link></li>

        ]
    }
  }

  render() {
    return (
      <div>
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/' : '/'}
            className="left brand-logo"
          >
            Ribbit
          </Link>
          <ul className="right" id="headerUl">
            {this.renderContent()}
          </ul>
        </div>
      </nav>

      </div>
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
