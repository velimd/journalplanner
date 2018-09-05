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
            search:[{
                show:false,
                message:""
            }]
        };
    }
    componentDidMount(){
        this.getResources();
    }
    getResources(){
        var url = 'http://localhost:8080/api/resource/all';
        axios.get(url).then(res => {
            this.setState({
                resources:res.data
            });
        });
    }
    updateSearch(e){
        if(e.target.value!=="") {
            var url = 'http://localhost:8080/api/resource/search/' + e.target.value.toString();
            axios.get(url).then(res => {
                this.setState({
                    resources: res.data
                });
            });
        }
        else{
            this.getResources();
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
            this.getResources();
        }
    }
    render() {
        return (
            <div className="resource">
                <Navbar/>
                <div className="row">
                    <div className="col">
                        <form className="form-inline" id="search">
                            <input className="form-control my-2" ref="search" placeholder="Search" onClick={this.searchMessageClosed.bind(this)} onChange={this.updateSearch.bind(this)}/>
                        </form>
                    </div>
                    <div className="col">
                        <div style={{textAlign:'center'}}>
                            <Link to="/resources/add" ><button type="button" id="btn-add" className="btn">Add</button></Link>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                {this.state.search.show && <div className="alert alert-info" role="alert">
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
                            <th scope="col">Memo</th>
                            <th scope="col">Stack</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.resources.map((r) => {
                            return (
                                <tr key={r.id}>
                                    <th scope="row">{r.id}</th>
                                    <td><Link to={"resources/edit/"+r.id}>{r.name}</Link></td>
                                    <td><a href={"http://"+r.url}>{r.url}</a></td>
                                    <td>{r.memo}</td>
                                    <td>
                                        {r.languages.map((l, k) =>
                                            <button type="button" value={l.name} className="btn btn-info btn-sm" key={l.id} onClick={this.searchMessage.bind(this)}>{l.name}</button>
                                        )}
                                        {r.frameworks.map((f, i) =>
                                            <button type="button" value={f.name} className="btn btn-info btn-sm" key={f.id} onClick={this.searchMessage.bind(this)}>{f.name}</button>
                                        )}
                                        {r.technologies.map((t, n) =>
                                            <button type="button" value={t.name} className="btn btn-info btn-sm" key={t.id} onClick={this.searchMessage.bind(this)}>{t.name}</button>
                                        )}
                                        {r.dbs.map((d, j) =>
                                            <button type="button" value={d.name} className="btn btn-info btn-sm" key={d.id} onClick={this.searchMessage.bind(this)}>{d.name}</button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="/resources/add"><button type="button" id="btn-add" className="btn">Add</button></Link>
                </div>
            </div>
        );
    }
}

export default Resource;