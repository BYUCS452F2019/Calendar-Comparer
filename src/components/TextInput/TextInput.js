import React from 'react'

import styles from './TextInput.module.css'

const TextInput = ({className, name, label, inputRef, ...props})=>{
  return (
    <div className={(className?className + ' ':'') + styles.container}>
      <label htmlFor={name}>{label || (name[0].toUpperCase() + name.slice(1))}:</label>
      <input ref={inputRef} name={name} {...props}/>
    </div>
  )
}

export default TextInput
