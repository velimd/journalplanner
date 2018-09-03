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
            search:""
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/project/all';
        axios.get(url).then(res => {
            this.setState({
                projects:res.data
            });
        });
    }
    updateSearch(e){
        this.setState({
            search:e.target.value
        });
    }
    render() {
        let filteredList=this.state.projects.filter((project) => {
            return project.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className="col">
                        <form className="form-inline" id="search">
                            <input type="text" className="form-control my-2" placeholder="Search" onChange={this.updateSearch.bind(this)}/>
                        </form>
                    </div>
                    <div className="col">
                        <div style={{textAlign:'center'}}>
                            <Link to="/projects/add" ><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>

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
                        {filteredList.map((p) => {
                            return(
                                <tr key={p.id}>
                                    <th scope="row">{p.id}</th>
                                    <td><Link to={"projects/edit/"+p.id}>{p.name}</Link></td>
                                    <td><a href={"http://"+p.url}>{p.url}</a></td>
                                    <td>
                                        {p.languages.map((l, k) =>
                                            <button type="button" className="btn btn-primary btn-sm" key={l.id}>{l.name} </button>
                                        )}
                                        {p.frameworks.map((f, i) =>
                                            <button type="button" className="btn btn-primary btn-sm" key={f.id}>{f.name} </button>
                                        )}
                                        {p.dbs.map((d, j) =>
                                            <button type="button" className="btn btn-primary btn-sm" key={d.id}>{d.name} </button>
                                        )}
                                        {p.technologies.map((t, n) =>
                                            <button type="button" className="btn btn-primary btn-sm" key={t.id}>{t.name} </button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="/projects/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
                </div>
            </div>
        );
    }
}

export default Project;
