import React, { Component } from 'react'
import BlogForm from './BlogForm'
import BlogFormReview from './BlogFormReview'
import { reduxForm } from 'redux-form'
/*
* This is simple display component, which has state only to toggle the forms
on and off.
* Best way to think of forms and component tree is that BlogNew wraps BlogForm
to get access to onSurveySubmit, onCancel.
* BlogForm wraps Field components from redux-form.
* Field wraps our SurveysField, allowing it to receive standard redux-form properties,
 handlers, etc.
* The SurveyField component itself is a wrapper of a regular <input> tag, and passes
the props it gets from Field manually in a pure component.
*/

class BlogNew extends Component {
  state = { showFormReview: false }

  renderContent() {
    if(this.state.showFormReview){
      return <BlogFormReview
        onCancel={() => this.setState({ showFormReview: false })}/>
    }
    return <BlogForm
      onBlogSubmit={() => this.setState({ showFormReview: true })}
    />
  }
  render() {
    console.log("BlogNew state: ", this.state.showFormReview)
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({
  form: "blogForm",
})(BlogNew)
