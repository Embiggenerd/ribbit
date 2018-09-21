import React from 'react';

const Error = ({ error, onClickHandler, message }) => {
  // const { message, data } = error;

  return (
    <div className="valign-wrapper">
      <ul>
        <li className="center-align">
          <h4>{message}</h4>
        </li>
        <li className="center-align">
          <p>{error}</p>
        </li>
        <li className="center-align">
          <button onClick={onClickHandler}>Close</button>
        </li>
      </ul>
    </div>
  );
};

export default Error;
