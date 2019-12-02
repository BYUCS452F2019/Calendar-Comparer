import React, { Component } from 'react';
import styles from './CalendarColumn.module.css'

export class CalendarColumn extends Component {

    state = {
        schedule: this.props.schedule,
        day: this.props.day
    }

    ScheduleItem (time) {

        let calendarType = this.props.calendarType;
        let schedule = this.state.schedule[this.state.day]

        if (calendarType == "hm") //hm = heat map
        {
            //hsla(0-100, 82%, 49%, 1)
            let available = schedule[time] * 100
            const displayTime = time.match(/[0-9]+:[0-9][0-9]/)

            let ItemStyles = {
                backgroundColor: 'hsla(' + available + ', 59%, 74%, 1)'
            };

            return <div style={ItemStyles}>{displayTime}</div>
        }
        else if (calendarType == "mvp") {

        }
        else // calendarType == "wig(when is good)"
        {
            const available = schedule[time] === 1
            const displayTime = time.match(/[0-9]+:[0-9][0-9]/)

            return <div className={styles.ScheduleItem + (available ? ' ' + styles.ScheduleItemAvailable : '')}>{displayTime}</div>
        }
    }

    render() {

        return (
            <div className={styles.Container}>
                <div className={styles.Header}>{this.state.day}</div>
                <div className={styles.Schedule}>
                    {this.ScheduleItem("8:00am")}                        
                    {this.ScheduleItem("8:30am")}
                    {this.ScheduleItem("9:00am")}
                    {this.ScheduleItem("9:30am")}   
                    {this.ScheduleItem("10:00am")}
                    {this.ScheduleItem("10:30am")}
                    {this.ScheduleItem("11:00am")}
                    {this.ScheduleItem("11:30am")}
                    {this.ScheduleItem("12:00pm")}
                    {this.ScheduleItem("12:30pm")}
                    {this.ScheduleItem("1:00pm")}
                    {this.ScheduleItem("1:30pm")}
                    {this.ScheduleItem("2:00pm")}
                    {this.ScheduleItem("2:30pm")}
                    {this.ScheduleItem("3:00pm")}
                    {this.ScheduleItem("3:30pm")}
                    {this.ScheduleItem("4:00pm")}
                    {this.ScheduleItem("4:30pm")}
                    {this.ScheduleItem("5:00pm")}
                    {this.ScheduleItem("5:30pm")}
                    {this.ScheduleItem("6:00pm")}
                    {this.ScheduleItem("6:30pm")}
                    {this.ScheduleItem("7:00pm")}
                    {this.ScheduleItem("7:30pm")}
                    {this.ScheduleItem("8:00pm")}
                    {this.ScheduleItem("8:30pm")}
                </div>
            </div>
        );
    }


}


