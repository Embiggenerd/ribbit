import React from 'react'
import { Link } from 'react-router-dom'
import SurveysList from './surveys/SurveysList'
import BlogsList from './blogs/BlogsList'

/*
* This component does the displaying for SurveysList, and also renderSurveys
the add button that links to /surveys/new
*/

const Dashboard = () =>  {
  return(
    <div>
      <BlogsList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
        <Link to="/blogs/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
