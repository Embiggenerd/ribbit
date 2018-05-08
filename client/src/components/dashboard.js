import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BlogsList from "./blogs/BlogsList"
import { fetchOwnFollow } from "../actions/index"
import UserFollowingList from "./users/UserFollowingList"
import UserFollowersList from "./users/UserFollowersList"
import AddBlogButton from './buttons/addBlogButton'
/*
* This component does the displaying for SurveysList, and also renderSurveys
the add button that links to /surveys/new
*/

class Dashboard extends Component {
  componentDidMount() {

    this.props.fetchOwnFollow()
  }

  render() {
    return (
      <div>
        <BlogsList />
        <UserFollowingList following={this.props.following} />
        <UserFollowersList followers={this.props.followers} />
        <AddBlogButton />
      </div>
    )
  }
}
const mapStateToProps = ({ ownFollowing, ownFollowers }) => ({
  following: ownFollowing,
  followers: ownFollowers
})
export default connect(mapStateToProps, { fetchOwnFollow })(Dashboard)
