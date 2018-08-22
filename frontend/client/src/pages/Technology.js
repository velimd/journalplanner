import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar.js'

class Technology extends Component {
    constructor(){
        super();
        this.state={
            technologies:[]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/technology/all';
        axios.get(url).then(res => {
            this.setState({
                technologies:res.data
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div style={{textAlign:'center'}}>
                    <Link to="/technologies/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
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
                        {this.state.technologies.map((t, key) => {
                            return (
                                <tr key={t.id}>
                                    <th scope="row">{t.id}</th>
                                    <td><Link to={"technologies/edit/"+t.id}>{t.name}</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="/technologies/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
                </div>
            </div>
        );
    }
}

export default Technology;
