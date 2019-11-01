import React from 'react'
import {Icon} from '@rmwc/icon'

import styles from './CalendarMember.module.css'

const mockCurrentUser = 'f7f6cea9-85f3-4e2e-bc40-0e9617ca2b42'

export default function CalendarMember({member, pending, remove}){
    const isMe = (mockCurrentUser === member.id)

    return (
        <div className={styles.CalendarMember + (pending?' ' + styles.pending:'')}>
            {pending && <span className={styles.spinner}>...</span>}
            <span className={styles.email}>{member.email}</span>
            {
                !isMe
                    ? <Icon className={styles.remove} icon="close" onClick={remove}/>
                    : <span className={styles.current}>You</span>
            }
        </div>
    )
}
