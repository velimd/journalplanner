import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Project.css';
import Navbar from '../components/Navbar.js'

class Project extends Component {
    constructor(){
        super();
        this.state={
            projects:[],
            search:[{
                show:false,
                message:""
            }]
        };
    }
    componentDidMount(){
        this.getProjects();
    }
    getProjects(){
        var url = 'http://localhost:8080/api/project/all';
        axios.get(url).then(res => {
            this.setState({
                projects:res.data
            });
        });
    }
    updateSearch(e){
        if(e.target.value!=="") {
            var url = 'http://localhost:8080/api/project/search/' + e.target.value.toString();
            axios.get(url).then(res => {
                this.setState({
                    projects: res.data
                });
            });
        }
        else{
            this.getProjects();
        }
    }
    searchMessage(e){
        var message = "You search for "+e.target.textContent;
        this.refs.search.value="";
        this.setState({
            search:{
                show:true,
                message:message
            }
        });
        this.updateSearch(e)
    };
    searchMessageClosed(e){
        this.setState({
            search:{
                show:false,
                message:""
            }
        });
        if(e.target.value===""||e.target.value===undefined) {
            this.getProjects();
        }
    }
    render() {
        return (
            <div className="project">
                <Navbar/>
                <div className="row">
                    <div className="col">
                        <form className="form-inline" id="search">
                            <input type="text" className="form-control my-2" ref="search" placeholder="Search" onClick={this.searchMessageClosed.bind(this)} onChange={this.updateSearch.bind(this)}/>
                        </form>
                    </div>
                    <div className="col">
                        <div style={{textAlign:'center'}}>
                            <Link to="/projects/add" ><button type="button" id="btn-add" className="btn">Add</button></Link>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                {this.state.search.show && <div className="alert" id="search-alert" role="alert">
                    {this.state.search.message}
                    <button type="button" className="close" onClick={this.searchMessageClosed.bind(this)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <div>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">URL</th>
                            <th scope="col">Stack</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.projects.map((p) => {
                            return(
                                <tr key={p.id}>
                                    <th scope="row">{p.id}</th>
                                    <td><Link to={"projects/edit/"+p.id}>{p.name}</Link></td>
                                    <td><a href={"http://"+p.url}>{p.url}</a></td>
                                    <td>
                                        {p.languages.map((l) =>
                                            <button type="button" value={l.name} id="stack" className="btn btn-sm" key={l.id} onClick={this.searchMessage.bind(this)}>{l.name}</button>
                                        )}
                                        {p.frameworks.map((f) =>
                                            <button type="button" value={f.name} id="stack" className="btn btn-sm" key={f.id} onClick={this.searchMessage.bind(this)}>{f.name}</button>
                                        )}
                                        {p.technologies.map((t) =>
                                            <button type="button" value={t.name} id="stack" className="btn btn-sm" key={t.id} onClick={this.searchMessage.bind(this)}>{t.name}</button>
                                        )}
                                        {p.dbs.map((d) =>
                                            <button type="button" value={d.name} id="stack" className="btn btn-sm" key={d.id} onClick={this.searchMessage.bind(this)}>{d.name}</button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="/projects/add"><button type="button" id="btn-add" className="btn">Add</button></Link>
                </div>
            </div>
        );
    }
}

export default Project;
