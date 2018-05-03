import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchOwnTimeline,
  fetchBlogs,
  fetchComments,
  deleteBlog,
  deleteComment,
  rib
} from "../../actions"
import Timeline from "./timeline"
import BlogList from "./BlogList"
import CommentList from "./CommentList"
import TrendingList from "./TrendingList"

class TimelineContainer extends Component {
  state = {
    showType: "timeline"
  }

  componentDidMount() {
    this.props.fetchOwnTimeline()
  }

  renderShow() {
    switch (this.state.showType) {
      case "timeline":
        return (
          <Timeline
            rib={this.props.rib}
            deleteBlog={this.props.deleteBlog}
            list={this.state.timeline}
          />
        )
      case "bloglist":
        return (
          <BlogList
            rib={this.props.rib}
            deleteBlog={this.props.deleteBlog}
            list={this.props.blogs}
          />
        )
      case "commentlist":
        return <CommentsList list={this.props.comments} />
      case "trending":
        return (
          <BlogList
            rib={this.props.rib}
            deleteBlog={this.props.deleteBlog}
            list={this.props.trending}
          />
        )
    }
  }

  onClickHandler(showType) {
    this.setState({ showType })
    switch (showType) {
      case "bloglist" && this.props.blogs:
        this.props.fetchBlogs()
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.onClickHandler("timeline")}
          className="waves-effect waves-light btn-large"
        >
          Timeline
        </button>
        <button
          onClick={() => this.onClickHandler("bloglist")}
          className="waves-effect waves-light btn-large"
        >
          Blogs
        </button>
        <button
          onClick={() => this.onClickHandler("commentlist")}
          className="waves-effect waves-light btn-large"
        >
          Comments
        </button>
        <button
          onClick={() => this.onClickHandler("trending")}
          className="waves-effect waves-light btn-large"
        >
          Trending
        </button>
        {this.renderShow()}
      </div>
    )
  }
}

const mapStateToProps = ({ own: { timeline, blogs, comments, trending } }) => ({
  timeline,
  blogs
})

export default connect(mapStateToProps, {
  fetchOwnTimeline,
  fetchBlogs,
  fetchComments,
  deleteBlog,
  deleteComment,
  rib
})(TimelineContainer)
