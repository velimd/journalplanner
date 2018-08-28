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
                memo:""
            }],
            languages:[],
            frameworks:[],
            technologies:[],
            dbs:[],
            language:[],
            framework:[],
            technology:[],
            db:[]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/resource/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({
                resource:res.data,
                languages:res.data.languages,
                frameworks:res.data.frameworks,
                technologies:res.data.technologies,
                dbs:res.data.dbs
            })
        });

        axios.get('http://localhost:8080/api/language/all').then(res => {
            this.setState({
                language:res.data
            });
        });
        axios.get('http://localhost:8080/api/framework/all').then(res => {
            this.setState({
                framework:res.data
            });
        });
        axios.get('http://localhost:8080/api/technology/all').then(res => {
            this.setState({
                technology:res.data
            });
        });
        axios.get('http://localhost:8080/api/db/all').then(res => {
            this.setState({
                db:res.data
            });
        });
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
        };
        axios.put('http://localhost:8080/api/resource/'+this.props.match.params.id, resource).then(res =>{
            this.props.history.push('/resources');
        });
    }
    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/resource/delete/'+this.props.match.params.id).then(res =>{
            console.log(res);
            console.log(res.data);
            this.props.history.push('/resources');
        });
    }
    addStack(e){
        const stackName=e.target.name;
        const stack={
            id:e.target.id,
            name:e.target.textContent
        };
        var bool = this.state[stackName].some(function(e1){
            return e1.name===stack.name;
        });
        if(!bool) {
            this.setState({
                resource: {
                    ...this.state.resource,
                    [stackName]: this.state.resource[stackName].concat(stack)
                },
                [stackName]: this.state[stackName].concat(stack)
            });
        }
        else{
            console.log("Stack is already added");
        }
    }
    removeStack(e){
        const stackName=e.target.name;
        const newArr = this.state[stackName].filter(function(e1){
            return e1.name!==e.target.textContent;
        });
        this.setState({
            resource: {
                ...this.state.resource,
                [stackName]: newArr
            },
            [stackName]: newArr
        });
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
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
                                <div className="row">

                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Languages</th>
                                            <th scope="col">Frameworks</th>
                                            <th scope="col">Technologies</th>
                                            <th scope="col">Databases</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {this.state.languages.map((language) => {
                                                        return (
                                                            <div item={language} key={language.id}>
                                                                <button type="button" name="languages" id={language.id} className="btn btn-light" onClick={this.removeStack.bind(this)}>{language.name}</button>
                                                            </div>
                                                        )
                                                    })}
                                                </td>
                                                <td>
                                                    {this.state.frameworks.map((framework) => {
                                                        return (
                                                            <div item={framework} key={framework.id}>
                                                                <button type="button"  name="frameworks" id={framework.id} className="btn btn-light" onClick={this.removeStack.bind(this)}>{framework.name}</button>
                                                            </div>
                                                        )
                                                    })}
                                                </td>
                                                <td>
                                                    {this.state.technologies.map((technologies) => {
                                                        return (
                                                            <div item={technologies} key={technologies.id}>
                                                                <button type="button"  name="technologies" id={technologies.id} className="btn btn-light" onClick={this.removeStack.bind(this)}>{technologies.name}</button>
                                                            </div>
                                                        )
                                                    })}
                                                </td>
                                                <td>
                                                    {this.state.dbs.map((dbs) => {
                                                        return (
                                                            <div item={dbs} key={dbs.id}>
                                                                <button type="button"  name="dbs" id={dbs.id} className="btn btn-light" onClick={this.removeStack.bind(this)}>{dbs.name}</button>
                                                            </div>
                                                        )
                                                    })}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div className="form-row">
                                    <div className="dropdown col-md-3">
                                        <button className="btn btn-info dropdown-toggle" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            Languages
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {this.state.language.map((l, key) => {
                                                return (
                                                    <div key={l.id}>
                                                        <a className="dropdown-item" name="languages" id={l.id} onClick={this.addStack.bind(this)}>{l.name}</a>
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
                                            {this.state.framework.map((f, key) => {
                                                return (
                                                    <div key={f.id}>
                                                        <a className="dropdown-item" id={f.id} name="frameworks" onClick={this.addStack.bind(this)}>{f.name}</a>
                                                    </div>
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
                                            {this.state.technology.map((t, key) => {
                                                return (
                                                    <div key={t.id}>
                                                        <a className="dropdown-item" id={t.id} name="technologies" onClick={this.addStack.bind(this)}>{t.name}</a>
                                                    </div>
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
                                            {this.state.db.map((d, key) => {
                                                return (
                                                    <div key={d.id}>
                                                        <a className="dropdown-item" id={d.id} name="dbs" onClick={this.addStack.bind(this)}>{d.name}</a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <br/>
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
