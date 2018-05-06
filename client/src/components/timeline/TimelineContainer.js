import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchOwnTimeline,
  fetchBlogs,
  fetchComments,
  deleteBlog,
  deleteComment,
  getTrending,
  rib
} from "../../actions"
// import Timeline from "./timeline"
import BlogList from "./BlogList"
import CommentList from "./CommentList"
// import TrendingList from "./TrendingList"

class TimelineContainer extends Component {
  state = {
    showType: "timeline"
  }

  componentDidMount() {
    console.log("TimelineContiner did mount")
    this.props.fetchOwnTimeline()
  }

  onClickHandler(showType) {
    this.setState({ showType })
    switch (showType) {
      case "bloglist":
        return this.props.ownBlogs.length === 0 && this.props.fetchBlogs()
      case "timeline":
        return this.props.ownTimeline.length === 0 && this.props.fetchOwnTimeline()
      case "trending":
        return this.props.trending.length === 0 && this.props.getTrending()
      default:
        return
    }
  }

  handlers = {
    // "timeline": value => <BlogList blogs={value}/>,
    bloglist: value => (
      <BlogList
        rib={this.props.rib}
        deleteBlog={this.props.deleteBlog}
        blogs={value}
        authId={this.props._id}
      />
    ),
    commentList: value => (
      <CommentList deleteComment={this.props.deleteComment} comments={value} />
    )
  }

  displayData(type, value) {
    const handler = this.handlers[type]
    return handler(value)
  }

  renderShow() {
    const { showType } = this.state
    switch (showType) {
      case "timeline":
        return this.displayData("bloglist", this.props.ownTimeline)
      case "bloglist":
        return this.displayData("bloglist", this.props.ownBlogs)
      case "trending":
        return this.displayData("bloglist", this.props.trending)
      default:
        return <div>Waiting...</div>
    }
  }

  render() {
    console.log("TimeLineContainer's props: ", this.props)
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

const mapStateToProps = ({
  ownTimeline,
  ownBlogs,
  auth: { _id },
  ownComments,
  trending
}) => ({
  ownTimeline,
  ownBlogs,
  _id,
  trending
})

export default connect(mapStateToProps, {
  fetchOwnTimeline,
  fetchBlogs,
  fetchComments,
  deleteBlog,
  deleteComment,
  getTrending,
  rib
})(TimelineContainer)
