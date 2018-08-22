import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Home from './pages/Home.js';
import Resource from './pages/Resource.js';
import AddResource from './pages/AddResource.js';
import EditResource from './pages/EditResource';
import Project from './pages/Project.js'
import AddProject from './pages/AddProject.js';
import EditProject from './pages/EditProject';
import Language from './pages/Language';
import Framework from './pages/Framework';
import Technology from './pages/Technology';
import Db from './pages/Db';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
              <Route exact path="/" component={Home}/>

              <Route exact path="/resources" component={Resource}/>
              <Route exact path="/resources/add" component={AddResource}/>
              <Route exact path="/resources/edit/:id" component={EditResource}/>

              <Route exact path="/projects" component={Project}/>
              <Route exact path="/projects/add" component={AddProject}/>
              <Route exact path="/projects/edit/:id" component={EditProject}/>

              <Route exact path="/languages" component={Language}/>

              <Route exact path="/frameworks" component={Framework}/>

              <Route exact path="/technologies" component={Technology}/>

              <Route exact path="/dbs" component={Db}/>
          </div>
        </Router>
    );
  }
}

export default App;
