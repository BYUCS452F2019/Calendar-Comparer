import React from 'react'

import styles from './CalendarMember.module.css'

export default function CalendarMember({member, pending, remove}){
    return (
        <div className={styles.CalendarMember}>
            {pending && <span className={styles.spinner}>...</span>}
            <span className={styles.email}>{member.email}</span>
        </div>
    )
}
