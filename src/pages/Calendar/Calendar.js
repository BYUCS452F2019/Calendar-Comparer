import React, {useState, useEffect} from 'react';
import axios from 'axios'
import moment from 'moment'

import { CalendarColumn } from '../../components/CalendarColumn/CalendarColumn'
import styles from './Calendar.module.css'
import { CalendarTypeMenu } from '../../components/CalendarTypeMenu/CalendarTypeMenu'
import { func } from 'prop-types';

export default function CalendarView({ calendar }) {
    const [loading, setLoading] = useState(true)
    const [schedule, setSchedule] = useState(null)
    const [ShowThermometer, setShowThermometer] = useState("none")

    const [calendarType, setCalendarType] = useState("wig"); 

    function HandleCalendarChange(Type) {
        setCalendarType(Type);
        if (Type == 'hm') {
            setShowThermometer("inline-block")
        }
        else {
            setShowThermometer("none")
        }
    }

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
                <CalendarTypeMenu onClick={HandleCalendarChange} />
				{
					loading
						?<p style={{textAlign: 'center', marginTop: '20vh'}}>Loading calendar . . .</p>
                        : <div className={styles.Calendar}>
                            <CalendarColumn schedule={schedule} day="sunday" calendarType={calendarType} />
                            <CalendarColumn schedule={schedule} day="monday" calendarType={calendarType}  />
                            <CalendarColumn schedule={schedule} day="tuesday" calendarType={calendarType}  />
                            <CalendarColumn schedule={schedule} day="wednesday" calendarType={calendarType} />
                            <CalendarColumn schedule={schedule} day="thursday" calendarType={calendarType}  />
                            <CalendarColumn schedule={schedule} day="friday" calendarType={calendarType}  />
                            <CalendarColumn schedule={schedule} day="saturday" calendarType={calendarType}  />
						</div>
                }
                <span style={{ display: ShowThermometer }} className={styles.Thermometer}>
                    <div>100%</div>
                    <div className={styles.ThBottom}>0%</div>
                </span>
			</div>
			{/* <WeekCalendar/> */}
	  </div>
	)
}
