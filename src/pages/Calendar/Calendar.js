import React, {useState, useEffect} from 'react';
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {Icon} from '@rmwc/icon'

import CalendarSettings from '../CalendarSettings/CalendarSettings'
import CalendarColumn from '../../components/CalendarColumn/CalendarColumn'
import '@rmwc/icon/icon.css'
import styles from './Calendar.module.css'

export default function CalendarView({calendar}){
	const [loading, setLoading] = useState(true)
	const [schedule, setSchedule] = useState(null)

	useEffect(()=>{
		console.log('effect')
		const id = calendar.group_calendar_id
		const start = moment('2019-10-23').startOf('week').format('YYYY/MM/D')
		const end = moment('2019-10-23').endOf('week').add('days', 1).format('YYYY/MM/D')
		axios.get(`/api/getGroupAvailabilityCalendar?groupID=${id}&startDate=${start}&endDate=${end}`).then(({data})=>{
			setSchedule(convertToSaneDataFormat(data))
			setLoading(false)
		})
	}, [calendar.group_calendar_id])

	return (
		<>
			<Route path="/calendar/:calendar_id/settings"><CalendarSettings calendar={calendar} /></Route>
			<div className={styles.CalendarPage}>
				<h2 className={styles.CalendarName}>
					{calendar.group_calendar_name}
					<Link className={styles.CalendarSettingsLink} to={`/calendar/${calendar.group_calendar_id}/settings`}>
						<Icon icon="settings"/>
					</Link>
				</h2>

				<div className={styles.CalendarContainer}>
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
		</>
	)
}

const convertToSaneDataFormat = function(calendarArray){
	const days = calendarArray.map(day=>{
		return {
			'8:00am': day[16],
			'8:30am': day[17],
			'9:00am': day[18],
			'9:30am': day[19],
			'10:00am': day[20],
			'10:30am': day[21],
			'11:00am': day[22],
			'11:30am': day[23],
			'12:00pm': day[24],
			'12:30pm': day[25],
			'1:00pm': day[26],
			'1:30pm': day[27],
			'2:00pm': day[28],
			'2:30pm': day[29],
			'3:00pm': day[30],
			'3:30pm': day[31],
			'4:00pm': day[32],
			'4:30pm': day[33],
			'5:00pm': day[34],
			'5:30pm': day[35],
			'6:00pm': day[36],
			'6:30pm': day[37],
			'7:00pm': day[38],
			'7:30pm': day[39],
			'8:00pm': day[40],
			'8:30pm': day[41],
		}
	})

	return {
		'sunday': days[0],
		'monday': days[1],
		'tuesday': days[2],
		'wednesday': days[3],
		'thursday': days[4],
		'friday': days[5],
		'saturday': days[6]
	}
}
