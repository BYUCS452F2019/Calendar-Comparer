import React from 'react';
import styles from './App.module.css';
import Login from './pages/Login/Login.js';
import CalendarView from './pages/Calendar/Calendar.js';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

const App = ()=>(
  <BrowserRouter>
    {/* Redirect / to calendar */}
    <Route exact path="/">
      <Redirect to="/calendar"/>
    </Route>

    {/* General application structure */}
    <div className={styles.App}>
      <div className={styles.Appbar}>
        <Link to="/"><h1>Calendar Comparer</h1></Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/calendar">Calendar</Link>
        </nav>
      </div>
      <div className={styles.SidebarContainer}>
        {/* Don't show sidebar for login page */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <div className={styles.Sidebar}>(Calendar selector here)</div>
            <div className={styles.ContentArea}>
              <Route exact path="/calendar">
                <CalendarView />
              </Route>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)

export default App;
