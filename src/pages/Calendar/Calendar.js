import React from 'react';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';

export class CalendarView extends React.Component {

  constructor(props) {
    super(props);
	this.state = {
	};
  }

  render() {
		console.log(this.props.calendar)

	return (
	  <div className="calendar">
		<WeekCalendar/>
	  </div>
	);
  }
}

export default CalendarView;
