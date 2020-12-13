import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ClocksList from '../pages/ClocksList';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/clocks-list" exact component={ClocksList}></Route>
    </Switch> 
)

export default Routes;