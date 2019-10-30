import React from 'react'

import styles from './CalendarColumn.module.css'

export default function CalendarColumn({day, schedule}){
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>{day}</div>
      <div className={styles.Schedule}>
        <ScheduleItem schedule={schedule[day]} time="8:00am" />
        <ScheduleItem schedule={schedule[day]} time="8:30am" />
        <ScheduleItem schedule={schedule[day]} time="9:00am" />
        <ScheduleItem schedule={schedule[day]} time="9:30am" />
        <ScheduleItem schedule={schedule[day]} time="10:00am" />
        <ScheduleItem schedule={schedule[day]} time="10:30am" />
        <ScheduleItem schedule={schedule[day]} time="11:00am" />
        <ScheduleItem schedule={schedule[day]} time="11:30am" />
        <ScheduleItem schedule={schedule[day]} time="12:00pm" />
        <ScheduleItem schedule={schedule[day]} time="12:30pm" />
        <ScheduleItem schedule={schedule[day]} time="1:00pm" />
        <ScheduleItem schedule={schedule[day]} time="1:30pm" />
        <ScheduleItem schedule={schedule[day]} time="2:00pm" />
        <ScheduleItem schedule={schedule[day]} time="2:30pm" />
        <ScheduleItem schedule={schedule[day]} time="3:00pm" />
        <ScheduleItem schedule={schedule[day]} time="3:30pm" />
        <ScheduleItem schedule={schedule[day]} time="4:00pm" />
        <ScheduleItem schedule={schedule[day]} time="4:30pm" />
        <ScheduleItem schedule={schedule[day]} time="5:00pm" />
        <ScheduleItem schedule={schedule[day]} time="5:30pm" />
        <ScheduleItem schedule={schedule[day]} time="6:00pm" />
        <ScheduleItem schedule={schedule[day]} time="6:30pm" />
        <ScheduleItem schedule={schedule[day]} time="7:00pm" />
        <ScheduleItem schedule={schedule[day]} time="7:30pm" />
        <ScheduleItem schedule={schedule[day]} time="8:00pm" />
        <ScheduleItem schedule={schedule[day]} time="8:30pm" />
      </div>
    </div>
  )
}

function ScheduleItem({schedule, time}){
  const available = schedule[time] === 1
  const displayTime = time.match(/[0-9]+:[0-9][0-9]/)

  return <div className={styles.ScheduleItem + (available?' ' + styles.ScheduleItemAvailable:'')}>{displayTime}</div>
}
