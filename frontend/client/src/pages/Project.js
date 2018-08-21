import React, { Component } from 'react';

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
        fetch(url).then(res => res.json()).then(res => {
            this.setState({
                projects:res
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container-fluid">
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
                        {this.state.projects.map((p, key) =>
                            <tr>
                                <th scope="row">{p.id}</th>
                                <td>{p.name}k</td>
                                <td><a href={"http://"+p.url}>{p.url}</a></td>
                                <td>
                                    {p.languages.map((l, k) =>
                                        <button type="button" className="btn btn-primary btn-sm">{l.name} </button>
                                    )}
                                    {p.frameworks.map((f, i) =>
                                        <button type="button" className="btn btn-primary btn-sm">{f.name} </button>
                                    )}
                                    {p.dbs.map((d, j) =>
                                        <button type="button" className="btn btn-primary btn-sm">{d.name} </button>
                                    )}
                                    {p.technologies.map((t, n) =>
                                        <button type="button" className="btn btn-primary btn-sm">{t.name} </button>
                                    )}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Project;
