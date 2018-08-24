import React, { Component } from 'react';
import axios from 'axios';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class AddProject extends Component {
    addProject(e){
        e.preventDefault();
        var URL = 'http://localhost:8080/api/project/add';
        const project ={
            name:this.state.name,
            url:this.state.url
        };
        axios.post(URL, project).then(res =>{
            console.log(res);
            this.props.history.push('/projects/edit/'+res.data.id);
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
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={this.addProject.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="Name">Title</label>
                                    <input type="text" className="form-control" name="name" placeholder="Title" onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="URL">URL</label>
                                    <input type="text" className="form-control" name="url" placeholder="Url" onChange={this.handleChange.bind(this)}/>
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

export default AddProject;
