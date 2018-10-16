import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
const Routes = () => {
    return (
        <div className = ''>
            <Route path = "/" exact component = { Home } />
            <Route path = "/signup" exact component = { SignUp } />
            <Route path = "/Dashboard" exact component = { Dashboard } />
        </div>
    )
}

export default Routes;