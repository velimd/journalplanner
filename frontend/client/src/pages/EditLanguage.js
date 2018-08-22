import React, { Component } from 'react';
import axios from 'axios';

import './Add.css';
import Navbar from '../components/Navbar.js'

class EditLanguage extends Component {
    constructor(props){
        super(props);
        this.state={
            language:[{
                name:""
            }]
        };
    }
    componentDidMount(){
        var url = 'http://localhost:8080/api/language/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({language:res.data})
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
        const language ={
            name:this.state.name || this.state.language.name
        }
        axios.put('http://localhost:8080/api/language/'+this.props.match.params.id, language).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/languages');
    }
    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/language/delete/'+this.props.match.params.id).then(res =>{
            console.log(res);
            console.log(res.data);
        })
        this.props.history.push('/languages');
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
                                    <input type="text" className="form-control" name="name" placeholder="Name" defaultValue={this.state.language.name} onChange={this.handleChange.bind(this)}/>
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

export default EditLanguage;
