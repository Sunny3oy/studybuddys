import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';

const Routes = () => {
    return (
        <div className = ''>
            <Route path = "/" exact component = { Home } />
            <Route path = "/signup" exact component = { SignUp } />
        </div>
    )
}

export default Routes;