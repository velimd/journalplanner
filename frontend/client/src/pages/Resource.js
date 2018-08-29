import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Resource.css';
import Navbar from '../components/Navbar.js'

class Resource extends Component {
    constructor(){
        super();
        this.state={
            resources:[],
            search:""
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/resource/all';
        axios.get(url).then(res => {
            this.setState({
                resources:res.data
            });
        });
    }
    updateSearch(e){
        this.setState({
           search:e.target.value
        });
    }
    render() {
        let filteredList=this.state.resources.filter((resource) => {
            return resource.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className="col">
                        <form className="form-inline" id="search">
                            <input className="form-control my-2" placeholder="Search" onChange={this.updateSearch.bind(this)}/>
                        </form>
                    </div>
                    <div className="col">
                        <div style={{textAlign:'center'}}>
                            <Link to="/resources/add" ><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
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
                            <th scope="col">Memo</th>
                            <th scope="col">Stack</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredList.map((r, key) => {
                            return (
                                <tr key={r.id}>
                                    <th scope="row">{r.id}</th>
                                    <td><Link to={"resources/edit/"+r.id}>{r.name}</Link></td>
                                    <td><a href={"http://"+r.url}>{r.url}</a></td>
                                    <td>{r.memo}</td>
                                    <td>
                                        {r.languages.map((l, k) =>
                                            <button type="button" className="btn btn-primary btn-sm" key={l.id}>{l.name} </button>
                                        )}
                                        {r.frameworks.map((f, i) =>
                                            <button type="button" className="btn btn-primary btn-sm" key={f.id}>{f.name} </button>
                                        )}
                                        {r.dbs.map((d, j) =>
                                            <button type="button" className="btn btn-primary btn-sm" key={d.id}>{d.name} </button>
                                        )}
                                        {r.technologies.map((t, n) =>
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
                    <Link to="/resources/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
                </div>
            </div>
        );
    }
}

export default Resource;