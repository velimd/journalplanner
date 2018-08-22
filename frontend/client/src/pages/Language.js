import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar.js'

class Language extends Component {
    constructor(){
        super();
        this.state={
            languages:[]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/language/all';
        axios.get(url).then(res => {
            this.setState({
                languages:res.data
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div style={{textAlign:'center'}}>
                    <Link to="/languages/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
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
                        {this.state.languages.map((l, key) => {
                            return (
                                <tr key={l.id}>
                                    <th scope="row">{l.id}</th>
                                    <td><Link to={"resources/edit/"+l.id}>{l.name}</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="/languages/add"><button type="button" id="btn-add" className="btn btn-dark">Add</button></Link>
                </div>
            </div>
        );
    }
}

export default Language;
