import React, { Component } from 'react';
import axios from 'axios';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class AddResource extends Component {
    addResource(e){
        e.preventDefault();
        var URL = 'http://localhost:8080/api/resource/add';
        const resource ={
            name:this.state.name,
            url:this.state.url,
            memo:this.state.memo
        };
        axios.post(URL, resource).then(res =>{
            console.log(res);
            console.log(res.data);
            this.props.history.push('/resources/edit/'+res.data.id);
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
                            <form onSubmit={this.addResource.bind(this)}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Name">Title</label>
                                        <input type="text" className="form-control" name="name" placeholder="Title" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="URL">URL</label>
                                        <input type="text" className="form-control" name="url" placeholder="URL" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Memo">Memo</label>
                                    <input type="text" className="form-control" name="memo" placeholder="Memo" onChange={this.handleChange.bind(this)}/>
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

export default AddResource;
