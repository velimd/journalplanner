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
import AddLanguage from './pages/AddLanguage';
import EditLanguage from './pages/EditLanguage';

import Framework from './pages/Framework';
import AddFramework from './pages/AddFramework';
import EditFramework from './pages/EditFramework';

import Technology from './pages/Technology';
import AddTechnology from './pages/AddTechnology';
import EditTechnology from './pages/EditTechnology';

import Db from './pages/Db';
import AddDb from './pages/AddDb';
import EditDb from './pages/EditDb';

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
              <Route exact path="/languages/add" component={AddLanguage}/>
              <Route exact path="/languages/edit/:id" component={EditLanguage}/>

              <Route exact path="/frameworks" component={Framework}/>
              <Route exact path="/frameworks/add" component={AddFramework}/>
              <Route exact path="/frameworks/edit/:id" component={EditFramework}/>

              <Route exact path="/technologies" component={Technology}/>
              <Route exact path="/technologies/add" component={AddTechnology}/>
              <Route exact path="/technologies/edit/:id" component={EditTechnology}/>

              <Route exact path="/dbs" component={Db}/>
              <Route exact path="/dbs/add" component={AddDb}/>
              <Route exact path="/dbs/edit/:id" component={EditDb}/>
          </div>
        </Router>
    );
  }
}

export default App;
