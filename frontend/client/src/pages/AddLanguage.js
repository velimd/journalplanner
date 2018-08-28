import React, { Component } from 'react';
import axios from 'axios';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class AddLanguage extends Component {
    addLanguage(e){
        var URL = 'http://localhost:8080/api/language/add';

        e.preventDefault();

        const language ={
            name:this.state.name
        };

        axios.post(URL, language).then(res =>{
            console.log(res);
            console.log(res.data);
            this.props.history.push('/languages');
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
                            <form onSubmit={this.addLanguage.bind(this)}>
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

export default AddLanguage;
