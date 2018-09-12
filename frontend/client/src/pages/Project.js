import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Project.css';
import Navbar from '../components/Navbar.js'

const path = "http://localhost:8080/api/project";

class Project extends Component {

    constructor(){
        super();
        this.state={
            projects:[],
            search:{
                searchText:"",
                show:false,
                message:""
            }
        };
    }

    componentDidMount(){
        this.getProjects();
    }

    getProjects(){
        var url = `${path}/all`;
        axios.get(url).then(res => {
            this.setState({
                projects:res.data
            });
        });
    }

    searchMessage(e){
        if(e.target.value !== ""){
            let message = `You search for ${e.target.value}`;
            this.setState({
                search:{
                    searchText:e.target.value,
                    show:true,
                    message:message
                }
            });
        }
        else{
            this.searchMessageClosed(e);
        }
    }

    searchMessageClosed(e){
        this.refs.search.value = "";
        this.setState({
            search:{
                searchText:"",
                show:false,
                message:""
            }
        });
    }

    render() {
        let filteredList = this.state.projects.filter( (project) => {

            if(project.name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                return true;
            }

            if(project.url.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                return true;
            }

            if(project.languages.length !== 0){
                for(let i = 0; i<project.languages.length; i++){
                    if(project.languages[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            if(project.frameworks.length !== 0){
                for(let i = 0; i<project.frameworks.length; i++){
                    if(project.frameworks[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            if(project.technologies.length !== 0){
                for(let i = 0; i<project.technologies.length; i++){
                    if(project.technologies[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            if(project.dbs.length !== 0){
                for(let i = 0; i<project.dbs.length; i++){
                    if(project.dbs[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            return false;

        });

        return (
            <div className="project">
                <Navbar/>
                <div className="row">
                    <div className="col">
                        <form className="form-inline" id="search">
                            <input type="text" className="form-control my-2" ref="search" placeholder="Search" onClick={this.searchMessageClosed.bind(this)} onChange={this.searchMessage.bind(this)}/>
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
                            <th scope="col">Url</th>
                            <th scope="col">Stack</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredList.map( o =>
                                <tr key={o.id}>
                                    <th scope="row">{o.id}</th>
                                    <td><Link to={"projects/edit/"+o.id}>{o.name}</Link></td>
                                    <td><a href={"http://"+o.url}>{o.url}</a></td>
                                    <td>
                                        {o.languages.map((l) =>
                                            <button type="button" value={l.name} id="stack" className="btn btn-sm" key={l.id} onClick={this.searchMessage.bind(this)}>{l.name}</button>
                                        )}
                                        {o.frameworks.map((f) =>
                                            <button type="button" value={f.name} id="stack" className="btn btn-sm" key={f.id} onClick={this.searchMessage.bind(this)}>{f.name}</button>
                                        )}
                                        {o.technologies.map((t) =>
                                            <button type="button" value={t.name} id="stack" className="btn btn-sm" key={t.id} onClick={this.searchMessage.bind(this)}>{t.name}</button>
                                        )}
                                        {o.dbs.map((d) =>
                                            <button type="button" value={d.name} id="stack" className="btn btn-sm" key={d.id} onClick={this.searchMessage.bind(this)}>{d.name}</button>
                                        )}
                                    </td>
                                </tr>
                            )}
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