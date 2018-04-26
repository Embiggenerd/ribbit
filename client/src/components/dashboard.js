import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import SurveysList from "./surveys/SurveysList"
import BlogsList from "./blogs/BlogsList"
import { fetchOwnFollow } from "../actions"
import UserFollowingList from "./users/UserFollowingList"
import UserFollowersList from "./users/UserFollowersList"
/*
* This component does the displaying for SurveysList, and also renderSurveys
the add button that links to /surveys/new
*/

class Dashboard extends Component {
  componentDidMount() {
    fetchOwnFollow()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <BlogsList />
        <UserFollowingList following={this.props.following} />
        <UserFollowersList followers={this.props.followers} />
        <div className="fixed-action-btn">
          <Link to="/blogs/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ own: { following, followers } }) => ({
  following,
  followers
})
export default connect(mapStateToProps, { fetchOwnFollow })(Dashboard)
