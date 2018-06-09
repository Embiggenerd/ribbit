import React from "react"
import { Link } from 'react-router-dom'

export const AddBlogButton =  () => (
  <div className="fixed-action-btn">
    <Link to="/blogs/new" className="btn-floating btn-large red">
      <i className="material-icons">add</i>
    </Link>
  </div>
)

export default AddBlogButton