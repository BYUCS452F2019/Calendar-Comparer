import React from 'react'

import styles from './Dropdown.module.css'

export default function Dropdown({options, onSelected, visible}){
  return (
    <div className={styles.container + (visible?' ' + styles.visible:'')}>
      <div className={styles.list}>
        {options && options.map(option=>(
          <div className={styles.option} onClick={()=>onSelected(option)}>{option}</div>
        ))}
      </div>
    </div>
  )
}
