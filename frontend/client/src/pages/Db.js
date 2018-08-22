import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar.js'

class Db extends Component {
    constructor(){
        super();
        this.state={
            dbs:[]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/db/all';
        axios.get(url).then(res => {
            this.setState({
                dbs:res.data
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div style={{textAlign:'center'}}>
                    <Link to="/resources/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
                </div>
                <div>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.dbs.map((d, key) => {
                            return (
                                <tr key={d.id}>
                                    <th scope="row">{d.id}</th>
                                    <td><Link to={"resources/edit/"+d.id}>{d.name}</Link></td>
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

export default Db;
