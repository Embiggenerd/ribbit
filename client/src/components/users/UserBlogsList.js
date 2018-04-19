import React from "react"
import _ from "lodash"
import { Link } from "react-router-dom"

const userBlogsList = ({ blogs }) => {
  const renderBlogsList = () => {
    return _.map(blogs, blog => (
      <li key={blog._id} className="collection-item">
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </li>
    ))
  }
  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4>Blogs</h4>
      </li>
      {renderBlogsList()}
    </ul>
  )
}
export default userBlogsList
