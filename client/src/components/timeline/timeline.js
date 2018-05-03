import React from "react"
import { Link } from "react-router-dom"

const timeline = ({ list }) => {

  const renderList = () => {
    switch (list) {
      case undefined:
        return <h2>One sec...</h2>
      default:
        return list.map(blog => {
          return (
            <div key={blog._id} className="card blue-grey darken-1 yellow-text">
              <div className="card-content">
                <Link
                  to={{
                    pathname: `/blogs/${blog._id}`
                  }}
                >
                  <span className="card-title">{blog.title}</span>
                </Link>
                <p>{blog.body}</p>

                <p className="left">
                  By:{" "}
                  <Link to={`/users/${blog._user}`}>
                    {blog._userDisplayName}
                  </Link>
                </p>

                <p className="right">
                  Sent on: {new Date(blog.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Ribs: {blog.ribs}</a>
                <Link to={{ pathname: `/blogs/${blog._id}` }}>
                  Leave A Comment
                </Link>
                {this.ribButton(blog._user, blog._id)}
                {this.deleteButton(blog._user, blog._id)}
              </div>
            </div>
          )
        })
    }
  }

  return <div>{renderList()}</div>
}
