import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieList from '../pages/MovieList';
import MovieDetails from '../pages/MovieDetails';
import Login from '../pages/Login';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/movie-details/" component={MovieDetails}></Route>
    </Switch> 
)

export default Routes;