import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                {/* exact = must match.. otherwise it will fall on first one */}
                <Route path="/" exact component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
                {/* TO-DO: 404 */}
            </Switch>
        </BrowserRouter>
    );
}