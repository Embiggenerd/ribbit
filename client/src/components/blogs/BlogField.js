import React from 'react'

export default (props) => {
  const {input, textArea, label, id, meta:{ error, touched }} = props
  if(textArea) {
    return (
      <div>
         <label>{label}</label>
         <textarea  id={id} className="materialize-textarea" {...input}  />
         <div className="red-text" >
           {touched && error}
         </div>
      </div>
    )
  }
  return (
    <div>
     <label>{label}</label>
     <input {...input}  />
     <div className="red-text" >
       {touched && error}
     </div>
   </div>
  )
}
