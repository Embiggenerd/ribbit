import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchOwnTimeline } from "../../actions"

class TimelineContainer extends Component {
  componentDidMount() {
    this.props.fetchOwnTimeline()
  }
  render(){
    return (<div>timelinez</div>)
  }
}

const mapStateToProps = ({ following }) => ({
  following
})

export default connect(mapStateToProps, {
  fetchOwnTimeline
})(TimelineContainer)
