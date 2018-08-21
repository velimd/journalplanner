import React, { Component } from 'react';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class Resource extends Component {
    constructor(){
        super();
        this.state={
            resources:[]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/resource/all';
        fetch(url).then(res => res.json()).then(res => {
            this.setState({
                resources:res
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
                        <th scope="col">Memo</th>
                        <th scope="col">Stack</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.resources.map((r, key) =>
                    <tr>
                        <th scope="row">{r.id}</th>
                        <td>{r.name}k</td>
                        <td><a href={"http://"+r.url}>{r.url}</a></td>
                        <td>{r.memo}</td>
                        <td>
                            {r.languages.map((l, k) =>
                                <button type="button" className="btn btn-primary btn-sm">{l.name} </button>
                            )}
                            {r.frameworks.map((f, i) =>
                                <button type="button" className="btn btn-primary btn-sm">{f.name} </button>
                            )}
                            {r.dbs.map((d, j) =>
                                <button type="button" className="btn btn-primary btn-sm">{d.name} </button>
                            )}
                            {r.technologies.map((t, n) =>
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

export default Resource;
