import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar.js'

class Framework extends Component {
    constructor(){
        super();
        this.state={
            frameworks:[]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/framework/all';
        axios.get(url).then(res => {
            this.setState({
                frameworks:res.data
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div style={{textAlign:'center'}}>
                    <Link to="/frameworks/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
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
                        {this.state.frameworks.map((f, key) => {
                            return (
                                <tr key={f.id}>
                                    <th scope="row">{f.id}</th>
                                    <td><Link to={"resources/edit/"+f.id}>{f.name}</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="/frameworks/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
                </div>
            </div>
        );
    }
}

export default Framework;
