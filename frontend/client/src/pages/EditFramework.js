import React, { Component } from 'react';
import axios from 'axios';

import './Add.css';
import Navbar from '../components/Navbar.js'

class EditFramework extends Component {
    constructor(props){
        super(props);
        this.state={
            framework:[{
                name:""
            }]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/framework/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({framework:res.data})
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
        const framework ={
            name:this.state.name || this.state.framework.name
        }
        axios.put('http://localhost:8080/api/framework/'+this.props.match.params.id, framework).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/frameworks');
    }
    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/framework/delete/'+this.props.match.params.id).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/frameworks');
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
                                    <input type="text" className="form-control" name="name" placeholder="Name" defaultValue={this.state.framework.name} onChange={this.handleChange.bind(this)}/>
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

export default EditFramework;
