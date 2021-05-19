import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import { EventsList, EventUpload, EventList, EventsInsert, EventDownload} from '../pages'
import {
    NavLink,
} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css'
//
import '../style/index.css'
function App() {
    return (
        <Router>
            <center>
                <div className="header">
                    <h2>Welcome to the GSU student Check-in page</h2>
                    <button className="button"><NavLink to="/events/list">View Events</NavLink></button>
                    <button className="button"><NavLink to="/events/create">Create Event</NavLink></button>
                </div>

                <div className="content">
                    <Route exact path="/events/list" component={EventsList} />
                    <Route path="/events/create" component={EventsInsert} />
                    <Route path="/:id/view/" component={EventList} />
                    <Route path="/:id/upload/" component={EventUpload} />
                    <Route path="/:id/download/" component={EventDownload} />
                </div>
            </center>
        </Router>
    )
}

export default App
