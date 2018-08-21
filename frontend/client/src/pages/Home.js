import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import Navbar from '../components/Navbar.js'

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className="container">
                        <div className="jumbotron text-center col-md-6">
                            <h1>Resources</h1>
                            <Link to="/resources">
                                <button type="button" className="btn btn-primary">View</button>
                            </Link>
                        </div>
                        <div className="jumbotron text-center col-md-6">
                            <h1>Projects</h1>
                            <Link to="/projects">
                                <button type="button" className="btn btn-primary">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
