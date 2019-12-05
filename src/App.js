import React, {useState, useEffect} from 'react';
import axios from 'axios'
import styles from './App.module.css';
import Login from './pages/Login/Login.js';
import CalendarView from './pages/Calendar/Calendar.js';
import CalendarNavItem from './components/CalendarNavItem/CalendarNavItem'

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

const App = ()=>{
  const [calendars, setCalendars] = useState(null)

  // Attempt to load group calendars if we don't already have them
  useEffect(()=>{
    if(!calendars)
        axios.get('/api/getGroupCalendars?userID=f7f6cea9-85f3-4e2e-bc40-0e9617ca2b42').then(res=>setCalendars(res.data))
  }, [calendars])

  // If we haven't loaded the list of calendars, then don't display the app yet
  if(!calendars)
    return (
      <p>Loading . . .</p>
    )

  return (
    <BrowserRouter>
      {/* Redirect / to first calendar */}
      <Route exact path="/">
        <Redirect to={`/calendar/${calendars[0] ? calendars[0].id : ''}`}/>
      </Route>

      {/* General application structure */}
      <div className={styles.App}>
        <div className={styles.Appbar}>
          <Link to="/"><h1>Calendar Comparer</h1></Link>
            {/* I'm commenting this out until I can figure out how to do the proper color math to actually follow this sort of gauge (cole) */}
            {/* <div id="AvaibleGageBar">
                      <span id="AGB100">100%</span><span>90%</span><span>80%</span><span>70%</span><span>60%</span><span>50%</span><span>40%</span><span>30%</span><span>20%</span><span>10%</span><span id="AGB0">0%</span>
            </div>                    */}
          <nav>
            <Link to="/login">Login</Link>
            {/* <Link to="/calendar">Calendar</Link> */}
          </nav>
        </div>
        <div className={styles.SidebarContainer}>
          {/* Don't show sidebar for login page */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <div className={styles.Sidebar}>
                <h2 className={styles.CalendarMenuHeader}>Calendars</h2>
                {calendars.map(calendar=><CalendarNavItem key={calendar.id} calendar={calendar} />)}
              </div>
              <div className={styles.ContentArea}>
                <Route path="/calendar/:calendar_id">
                  {({match})=>(
                    <>
                      {match && match.params && match.params.calendar_id &&
                        <CalendarView calendar={calendars.filter(c=>c.id === match.params.calendar_id)[0]}/>
                      }
                    </>
                  )}
                </Route>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
