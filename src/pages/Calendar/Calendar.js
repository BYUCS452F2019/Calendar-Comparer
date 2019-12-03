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
		const start = moment('2019-10-23').startOf('week').format('YYYY/MM/D')
		const end = moment('2019-10-23').endOf('week').add('days', 1).format('YYYY/MM/D')
		axios.get(`/api/getGroupAvailabilityCalendar?groupID=${id}&startDate=${start}&endDate=${end}`).then(({data})=>{
			setSchedule(convertToSaneDataFormat(data))
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
