import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Home from './pages/Home.js';
import Resource from './pages/Resource.js';
import Project from './pages/Project.js'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
              <Route exact path="/" component={Home}/>
              <Route exact path="/resources" component={Resource}/>
              <Route exact path="/projects" component={Project}/>
          </div>
        </Router>
    );
  }
}

export default App;
