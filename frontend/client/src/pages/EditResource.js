import React, { Component } from 'react';
import axios from 'axios';

import './Add.css';
import Navbar from '../components/Navbar.js'

class EditResource extends Component {
    constructor(props){
        super(props);
        this.state={
            resource:[{
                name:"",
                url:"",
                memo:"",
                languages:[],
                frameworks:[],
                technologies:[],
                dbs:[]
            }]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/resource/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({resource:res.data})
        })
    }
    handleChange(e) {
        const name=e.target.name;
        this.setState({
            [name]:e.target.value,
        });
    }
    onSubmit(e){
        e.preventDefault();
        const resource ={
            name:this.state.name || this.state.resource.name,
            url:this.state.url || this.state.resource.url,
            memo:this.state.memo || this.state.resource.memo,
            languages: this.state.resource.languages,
            frameworks: this.state.resource.frameworks,
            technologies: this.state.resource.technologies,
            dbs: this.state.resource.dbs
        }
        axios.put('http://localhost:8080/api/resource/'+this.props.match.params.id, resource).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/resources');
    }
    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/resource/delete/'+this.props.match.params.id).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/resources');
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Name">Title</label>
                                        <input type="text" className="form-control" name="name" placeholder="Title" defaultValue={this.state.resource.name} onChange={this.handleChange.bind(this)}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="URL">URL</label>
                                        <input type="text" className="form-control" name="url" placeholder="URL" defaultValue={this.state.resource.url} onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Memo">Memo</label>
                                    <input type="text" className="form-control" name="memo" placeholder="Memo" defaultValue={this.state.resource.memo} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <button className="btn btn-primary" type="submit" id="btn-add-submit">submit</button>
                            </form>
                            <div>
                                <button type="button" className="btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditResource;
