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
            }],
            language:[],
            framework:[],
            technology:[],
            db:[],
            languages:[],
            frameworks:[],
            technologies:[],
            dbs:[]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/project/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({project:res.data,
                languages:res.data.languages,
                frameworks:res.data.frameworks,
                technologies:res.data.technologies,
                dbs:res.data.dbs})
        })

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
        console.log(this.state.name)
        const project ={
            name:this.state.name || this.state.project.name,
            url:this.state.url || this.state.project.url,
            languages: this.state.project.languages,
            frameworks: this.state.project.frameworks,
            technologies: this.state.project.technologies,
            dbs: this.state.project.dbs
        }
        axios.put('http://localhost:8080/api/project/'+this.props.match.params.id, project).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/projects');
    }
    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/project/delete/'+this.props.match.params.id).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/projects');
    }
    addStack(e){
        const stackName=e.target.name;
        const stack={
            id:e.target.id,
            name:e.target.textContent
        }
        this.setState({
            project: {
                ...this.state.project,
                [stackName]: this.state.project[stackName].concat(stack)
            }
        });
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
                                                {this.state.languages.map((language, key) => {
                                                    return (
                                                        <div key={language.id}>
                                                            {language.name}
                                                        </div>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                {this.state.frameworks.map((framework, key) => {
                                                    return (
                                                        <div key={framework.id}>
                                                            {framework.name}
                                                        </div>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                {this.state.technologies.map((technologies, key) => {
                                                    return (
                                                        <div key={technologies.id}>
                                                            {technologies.name}
                                                        </div>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                {this.state.dbs.map((dbs, key) => {
                                                    return (
                                                        <div key={dbs.id}>
                                                            {dbs.name}
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
