import React from 'react'
import {Link} from 'react-router-dom'

import styles from './CalendarSettings.module.css'

export default function CalendarSettings({calendar}){
    return (
        <div className={styles.SettingsContainer}>
            <Link to={`/calendar/${calendar.id}`} className={styles.SettingsScrim}></Link>
            <div className={styles.ModalContainer}>
                <div className={styles.SettingsModal}>
                    <h2 className={styles.SettingsHeader}>Editing {calendar.name}</h2>
                    <h3>Members:</h3>
                    <pre>
                        {JSON.stringify(calendar, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}