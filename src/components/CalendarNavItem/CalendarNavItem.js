import React from 'react'
import {Link, useLocation} from 'react-router-dom'

import styles from './CalendarNavItem.module.css'

export default ({calendar})=>{
  const {pathname} = useLocation()
  const matches = pathname.match('^/calendar/([^/]*)')
  const currentCalendar = matches && matches[1]
  const selected = currentCalendar === calendar.group_calendar_id

  return <Link to={`/calendar/${calendar.group_calendar_id}`} className={styles.NavItem + (selected?' ' + styles.Selected:'')}>{calendar.group_calendar_name}</Link>
}
