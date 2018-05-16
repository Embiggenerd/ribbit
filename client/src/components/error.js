import React from "react"

const Error = ({ error: { message, data }, onClickHandler }) => {

  return (
    <div className="valign-wrapper">
    <ul>
      <li className="center-align"><h4 >{message}</h4></li>
      <li className="center-align"><p >{data}</p></li>
      <li className="center-align"><button onClick={onClickHandler}>Close</button></li>
    </ul>

    </div>
  )
}

export default Error
