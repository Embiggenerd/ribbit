import React from "react"

const Error = ({ message }) => {

  const h = () => {
    return {
      _html: message.toString() || ''
    }

  }

  return(
    <div dangerouslySetInnerHTML={h()} />
  )
}

export default Error
