import React from 'react';
import styles from './App.module.css';
import Login from './pages/Login/Login.js';
import CalendarView from './pages/Calendar/Calendar.js';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = ()=>(
  <BrowserRouter>
    <div className={styles.App}>
      <div className={styles.Appbar}>
        <h1>Calendar Comparer</h1>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/calendar">Calendar</Link>
        </nav>
      </div>
      <div className={styles.SidebarContainer}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <div className={styles.Sidebar}></div>
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
