import React, { Component } from 'react';

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
                            <button type="button" className="btn btn-primary">View</button>
                        </div>
                        <div className="jumbotron text-center col-md-6">
                            <h1>Projects</h1>
                            <button type="button" className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
