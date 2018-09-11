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
            search:{
                searchText:"",
                show:false,
                message:""
            }
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

    searchMessage(e){
        if(e.target.value!==""){
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
        this.refs.search.value="";
        this.setState({
            search:{
                searchText:"",
                show:false,
                message:""
            }
        });
    }

    render() {
        let filteredList = this.state.resources.filter( (resource) => {

            if(resource.name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                return true;
            }

            if(resource.url.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                return true;
            }

            if(resource.languages.length !== 0){
                for(let i = 0; i<resource.languages.length; i++){
                    if(resource.languages[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            if(resource.frameworks.length !== 0){
                for(let i = 0; i<resource.frameworks.length; i++){
                    if(resource.frameworks[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            if(resource.technologies.length !== 0){
                for(let i = 0; i<resource.technologies.length; i++){
                    if(resource.technologies[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            if(resource.dbs.length !== 0){
                for(let i = 0; i<resource.dbs.length; i++){
                    if(resource.dbs[i].name.toLowerCase().indexOf(this.state.search.searchText.toLowerCase()) !== -1){
                        return true;
                    }
                }
            }

            return false;

        });
        return (
            <div className="resource">
                <Navbar/>
                <div className="row">
                    <div className="col">
                        <form className="form-inline" id="search">
                            <input className="form-control my-2" ref="search" placeholder="Search" onClick={this.searchMessageClosed.bind(this)} onChange={this.searchMessage.bind(this)}/>
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
                            <th scope="col">Url</th>
                            <th scope="col">Memo</th>
                            <th scope="col">Stack</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredList.map( r =>
                            <tr key={r.id}>
                                <th scope="row">{r.id}</th>
                                <td><Link to={"resources/edit/"+r.id}>{r.name}</Link></td>
                                <td><a href={"http://"+r.url}>{r.url}</a></td>
                                <td>{r.memo}</td>
                                <td>
                                    {r.languages.map((l) =>
                                        <button type="button" value={l.name} id="stack" className="btn btn-info btn-sm" key={l.id} onClick={this.searchMessage.bind(this)}>{l.name}</button>
                                    )}
                                    {r.frameworks.map((f) =>
                                        <button type="button" value={f.name} id="stack" className="btn btn-info btn-sm" key={f.id} onClick={this.searchMessage.bind(this)}>{f.name}</button>
                                    )}
                                    {r.technologies.map((t) =>
                                        <button type="button" value={t.name} id="stack" className="btn btn-info btn-sm" key={t.id} onClick={this.searchMessage.bind(this)}>{t.name}</button>
                                    )}
                                    {r.dbs.map((d) =>
                                        <button type="button" value={d.name} id="stack" className="btn btn-info btn-sm" key={d.id} onClick={this.searchMessage.bind(this)}>{d.name}</button>
                                    )}
                                </td>
                            </tr>
                        )}
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