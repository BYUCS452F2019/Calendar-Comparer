import React, {useState, useEffect} from 'react';
import axios from 'axios'
import moment from 'moment'

import CalendarColumn from '../../components/CalendarColumn/CalendarColumn'
import styles from './Calendar.module.css'
import { CalendarTypeMenu } from '../../components/CalendarTypeMenu/CalendarTypeMenu'

export default function CalendarView({calendar}){
	const [loading, setLoading] = useState(true)
	const [schedule, setSchedule] = useState(null)

	useEffect(()=>{
		console.log('effect')
		const id = calendar.group_calendar_id
		axios.get(`/api/getGroupAvailabilityCalendar?groupID=${id}`).then(({data})=>{
			setSchedule(data)
			setLoading(false)
		})
	}, [calendar.group_calendar_id])

	return (
	  <div className={styles.CalendarPage}>
            <h2 className={styles.CalendarName}>{calendar.group_calendar_name}</h2>

            <div className={styles.CalendarContainer}>
                <CalendarTypeMenu />
				{
					loading
						?<p style={{textAlign: 'center', marginTop: '20vh'}}>Loading calendar . . .</p>
						:<div className={styles.Calendar}>
							<CalendarColumn schedule={schedule} day="sunday" />
							<CalendarColumn schedule={schedule} day="monday" />
							<CalendarColumn schedule={schedule} day="tuesday" />
							<CalendarColumn schedule={schedule} day="wednesday" />
							<CalendarColumn schedule={schedule} day="thursday" />
							<CalendarColumn schedule={schedule} day="friday" />
							<CalendarColumn schedule={schedule} day="saturday" />
						</div>
				}
			</div>
			{/* <WeekCalendar/> */}
	  </div>
	)
}
