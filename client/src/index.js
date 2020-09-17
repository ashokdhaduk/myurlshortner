import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Stats from './Stats.jsx';

ReactDOM.render(
    <Router>
        <Switch> 
            <Route exact path='/' component={App}></Route>
            <Route exact path='/stats' component={Stats}></Route>
        </Switch>
    </Router>, document.getElementById('root'));
