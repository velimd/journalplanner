import React, { Component } from 'react';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class AddResource extends Component {
    constructor(){
        super();
        this.state={
            resources:[]
        };
    }

    addResource(e){
        var URL = 'http://localhost:8080/api/resource/add';

        let name = document.getElementById('name').value;
        let url = document.getElementById('url').value;
        let memo = document.getElementById('memo').value;

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                url: url,
                memo:memo
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
                            <form onSubmit={this.addResource}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Name">Title</label>
                                        <input type="text" className="form-control" id="name" placeholder="Title" value={this.state.resources.name}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="URL">URL</label>
                                        <input type="text" className="form-control" id="url" placeholder="URL"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Memo">Memo</label>
                                    <input type="text" className="form-control" id="memo" placeholder="Memo"/>
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

export default AddResource;
