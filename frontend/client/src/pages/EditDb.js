import React, { Component } from 'react';
import axios from 'axios';

import './Add.css';
import Navbar from '../components/Navbar.js'

class EditDb extends Component {

    constructor(props){
        super(props);
        this.state={
            db:[{
                name:""
            }]
        };
    }

    componentDidMount(){
        var url = 'http://localhost:8080/api/db/'+this.props.match.params.id;
        axios.get(url).then(res => {
            this.setState({db:res.data})
        });
    }

    handleChange(e) {
        const name=e.target.name;
        this.setState({
            [name]:e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault();
        const db ={
            name:this.state.name || this.state.db.name
        };
        axios.put('http://localhost:8080/api/db/'+this.props.match.params.id, db).then(res =>{
            this.props.history.push('/dbs');
        });
    }

    delete(e){
        e.preventDefault();

        axios.delete('http://localhost:8080/api/db/delete/'+this.props.match.params.id).then(res =>{
            this.props.history.push('/dbs');
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="Name">Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Name" defaultValue={this.state.db.name} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <button className="btn btn-primary" type="submit" id="btn-add-submit">submit</button>
                            </form>
                            <div>
                                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteConfirm">Delete</button>

                                <div className="modal fade" id="deleteConfirm" tabIndex="-1" role="dialog"
                                     aria-labelledby="deleteConfirmLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="deleteConfirmLabel">Delete Confirmation</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Are you sure you want to delete this item?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-danger" onClick={this.delete.bind(this)} data-dismiss="modal">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditDb;
