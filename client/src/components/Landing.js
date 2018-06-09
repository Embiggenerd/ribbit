import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import TimelineContainer from "./timeline/TimelineContainer.js"
import AddBlogButton from './buttons/addBlogButton'

export class Landing extends Component {
  render() {
    switch (this.props.auth) {
      case null:
        return (
          <div style={{ textAlign: "center" }}>
            <h3>Checkin credentials...</h3>{" "}
          </div>
        )
      case false:
        return (
          <div style={{ textAlign: "center" }}>
            <h3>Welcome To Ribbit!</h3>
            <ul>
              <li>Ribbits have meaning!</li>
              <li>Timeline order is based on reading hours minus ribbits.</li>
              <li>You can&apos;t ribbit your way to the top</li>
              <li>But you can ribbit down the competition!</li>
            </ul>
            <a href="/auth/google">Login with Google</a>
          </div>
        )
      default:
        return (
          <div>
            <TimelineContainer />
            <AddBlogButton />
          </div>
        )
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default connect(mapStateToProps)(Landing)
