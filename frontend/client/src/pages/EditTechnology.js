import React, { Component } from 'react';
import axios from 'axios';

import './Add.css';
import Navbar from '../components/Navbar.js'

class EditTechnology extends Component {
    constructor(props){
        super(props);
        this.state={
            technology:[{
                name:""
            }]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/technology/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({technology:res.data})
        })
    }
    handleChange(e) {
        const name=e.target.name;
        this.setState({
            [name]:e.target.value,
        });
    }
    onSubmit(e){
        e.preventDefault();
        const technology ={
            name:this.state.name || this.state.technology.name
        }
        axios.put('http://localhost:8080/api/technology/'+this.props.match.params.id, technology).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/technologies');
    }
    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/technology/delete/'+this.props.match.params.id).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/technologies');
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="Name">Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Name" defaultValue={this.state.technology.name} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <button className="btn btn-primary" type="submit" id="btn-add-submit">submit</button>
                            </form>
                            <div>
                                <button type="button" className="btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTechnology;
