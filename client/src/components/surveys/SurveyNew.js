import React, { Component } from 'react'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
import { reduxForm } from 'redux-form'
/*
* Best way to think of forms and component tree is that SurveyNew wraps SurveyForm,
which wraps Field components from redux-form.
* Field wraps our SurveysField, allowing it to receive standard redux-form properties,
 handlers, etc.
* The SurveyField component itself is a wrapper of a regular <input> tag, and passes
the props it gets from Field manually in a pure component.
*/

class SurveyNew extends Component {
  state = { showFormReview: false }

  renderContent() {
    if(this.state.showFormReview){
      return <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}/>
    }
    return <SurveyForm
      onSurveySubmit={() => this.setState({ showFormReview: true })}
    />
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({
  form: "surveyForm",
})(SurveyNew)
