import React, { Component } from 'react';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class AddProject extends Component {

    addProject(e){
        var URL = 'http://localhost:8080/api/project/add';

        let name = document.getElementById('name').value;
        let url = document.getElementById('url').value;

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                url: url
            })
        })
            .then((res) =>res.json())
            .then((data) => console.log(data))
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={this.addProject}>
                                <div className="form-group">
                                    <label htmlFor="Name">Title</label>
                                    <input type="text" className="form-control" id="name" placeholder="Title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="URL">URL</label>
                                    <input type="text" className="form-control" id="url" placeholder="Url"/>
                                </div>
                                <button type="submit" id="btn-add-submit">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProject;
