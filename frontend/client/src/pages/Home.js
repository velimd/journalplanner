import React, { Component } from 'react';

import './Home.css';
import Navbar from '../components/Navbar.js'

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <h1> Welcome to the homepage!</h1>
                </div>
            </div>
        );
    }
}

export default Home;
