import React, { Component } from 'react';
import axios from 'axios';

import './Add.css';
import Navbar from '../components/Navbar.js'

class EditProject extends Component {
    constructor(props){
        super(props);
        this.state={
            project:[{
                name:"",
                url:""
            }]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/project/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({project:res.data})
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
        console.log(this.state.name)
        const project ={
            name:this.state.name || this.state.project.name,
            url:this.state.url || this.state.project.url
        }
        axios.put('http://localhost:8080/api/project/'+this.props.match.params.id, project).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/projects');
    }
    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/resource/delete/'+this.props.match.params.id).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/projects');
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
                                        <input type="text" className="form-control" name="name" placeholder="Title" defaultValue={this.state.project.name} onChange={this.handleChange.bind(this)}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="URL">URL</label>
                                        <input type="text" className="form-control" name="url" placeholder="URL" defaultValue={this.state.project.url} onChange={this.handleChange.bind(this)}/>
                                    </div>
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

export default EditProject;
