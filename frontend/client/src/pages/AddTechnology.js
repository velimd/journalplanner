import React, { Component } from 'react';
import axios from 'axios';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class AddTechnology extends Component {
    addTechnology(e){
        var URL = 'http://localhost:8080/api/technology/add';

        e.preventDefault();

        const technology ={
            name:this.state.name
        };

        axios.post(URL, technology).then(res =>{
            console.log(res);
            console.log(res.data);
            this.props.history.push('/technologies');
        });
    }
    handleChange(e) {
        const name=e.target.name;
        this.setState({
            [name]:e.target.value,
        });
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.addTechnology.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="Name">Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Name" onChange={this.handleChange.bind(this)}/>
                                </div>
                                <button className="btn btn-primary" type="submit" id="btn-add-submit">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTechnology;
