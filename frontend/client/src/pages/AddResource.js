import React, { Component } from 'react';
import axios from 'axios';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class AddResource extends Component {
    constructor(){
        super();
        this.state={
            languages:[{
                id:"",
                name:""
            }],
            frameworks:[],
            technologies:[],
            dbs:[]
        };
    }
    componentDidMount(){
        axios.get('http://localhost:8080/api/language/all').then(res => {
            this.setState({
                languages:res.data
            });
        });
        axios.get('http://localhost:8080/api/framework/all').then(res => {
            this.setState({
                frameworks:res.data
            });
        });
        axios.get('http://localhost:8080/api/technology/all').then(res => {
            this.setState({
                technologies:res.data
            });
        });
        axios.get('http://localhost:8080/api/db/all').then(res => {
            this.setState({
                dbs:res.data
            });
        });
    }
    addResource(e){
        var URL = 'http://localhost:8080/api/resource/add';

        e.preventDefault();

        const resource ={
            name:this.state.name,
            url:this.state.url,
            memo:this.state.memo,
            languages:{
                name:this.state.languages
            }


        }

        axios.post(URL, resource).then(res =>{
            console.log(res);
            console.log(res.data);
        })

        this.props.history.push('/resources');
    }
    handleChange(e) {
        const name=e.target.name;
        this.setState({
            [name]:e.target.value,
        });
    }
    fun(e){
        const language={
            id:e.target.name,
            name:e.target.textContent
        }
        this.setState({
            languages: language
        });
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-body">
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
                                <div className="form-row">
                                    <div className="dropdown col-md-3">
                                        <button className="btn btn-info dropdown-toggle" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            Languages
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {this.state.languages.map((l, key) => {
                                                return (
                                                    <div key={l.id}>
                                                        <a className="dropdown-item" name={l.id} onClick={this.fun.bind(this)}>{l.name}</a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="dropdown col-md-3">
                                        <button className="btn btn-success dropdown-toggle" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            Frameworks
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {this.state.frameworks.map((f, key) => {
                                                return (
                                                    <a className="dropdown-item" key={f.id} name="name">{f.name}</a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="dropdown col-md-3">
                                        <button className="btn btn-danger dropdown-toggle" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            Technologies
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {this.state.technologies.map((t, key) => {
                                                return (
                                                    <a className="dropdown-item" key={t.id} name="name">{t.name}</a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="dropdown col-md-3">
                                        <button className="btn btn-warning dropdown-toggle" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            Databases
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {this.state.dbs.map((d, key) => {
                                                return (
                                                    <a className="dropdown-item" key={d.id} name="name">{d.name}</a>
                                                )
                                            })}
                                        </div>
                                    </div>
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
