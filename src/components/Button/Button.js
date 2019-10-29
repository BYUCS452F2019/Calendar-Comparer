import React from 'react'

import styles from './Button.module.css'

const Button = ({loading, className, ...props})=>{
  if(!loading)
    return <button className={(className?className + ' ':'') + styles.button} {...props}/>

  return <div className={(className?className + ' ':'') + styles.button + ' ' + styles.fakeButton}>
    <div className={styles.loader}></div>
  </div>
}

export default Button
