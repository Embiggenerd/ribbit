import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

/*
* This invokes fetch surveys to display a lit of a user's surveys to them. It
is displayed by Dashboard.
*/

class SurveysList extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }
  renderSurveys(){
    return this.props.surveys.reverse().map(survey => (
      <div key={survey._id} className="card blue-grey darken-1 yellow-text">
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">Sent on: { new Date(survey.dateSent).toLocaleDateString() }</p>
        </div>
        <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div>
      </div>
    ))
  }
  render() {
    return (
      <div>{this.renderSurveys()}</div>
    )
  }
}

const mapStateToProps = ({surveys}) => ({
  surveys
})

export default connect(mapStateToProps, { fetchSurveys })(SurveysList)
