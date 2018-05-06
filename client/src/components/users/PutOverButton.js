import React from "react"

const PutOverButton = ({ onClickPutOverHandler, authId, _user }) => {
  if (authId && _user !== authId) {
    return (
      <button
        className="teal btn-flat white-text"
        onClick={() => onClickPutOverHandler(_user)}
      >
        Put&apos;m Over
      </button>
    )
  } else {
    return null
  }
}

export default PutOverButton
