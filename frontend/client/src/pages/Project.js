import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Project.css';
import Navbar from '../components/Navbar.js'

class Project extends Component {
    constructor(){
        super();
        this.state={
            projects:[]
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

    render() {
        return (
            <div>
                <Navbar/>
                <div style={{textAlign:'center'}}>
                    <Link to="/projects/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
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
                        {this.state.projects.map((p, key) => {
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
