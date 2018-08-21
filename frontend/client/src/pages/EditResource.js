import React, { Component } from 'react';
import axios from 'axios';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class EditResource extends Component {
    constructor(props){
        super(props);
        this.state={
            resource:{
                name:'',
                url:'',
                memo:''
            }
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/resource/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({resource:res.data})
        })
    }
    editResource(e){
        e.preventDefault();
        const r ={
            name:this.state.name,
            url:this.state.url,
            memo:this.state.memo
        }
        axios.put('http://localhost:8080/api/resource/'+this.props.match.params.id, r).then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={this.editResource}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Name">Title</label>
                                        <input type="text" className="form-control" id="name" placeholder="Title" value={this.state.resource.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="URL">URL</label>
                                        <input type="text" className="form-control" id="url" placeholder="URL" value={this.state.resource.url}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Memo">Memo</label>
                                    <input type="text" className="form-control" id="memo" placeholder="Memo" value={this.state.resource.memo}/>
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

export default EditResource;
