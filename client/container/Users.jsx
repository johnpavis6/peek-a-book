import React, { Component } from 'react';
import api from 'axios';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr'

const columns = [
    { label: "Name", key: "name" }, { label: "Roll No", key: "rollNo" },
    { label: "Phone", key: "phone" }, { label: "Email", key: "email" },
    { label: "Year", key: "year" }, { label: "Campus", key: "campus" },
    { label: "Stay", key: "stayType" }
];

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            filterKeyValues: { name: "-" }
        }
        this.getUsers = this.getUsers.bind(this);
        this.filteredResults = this.filteredResults.bind(this);
        this.getResults = this.getResults.bind(this);
    }
    getUsers() {
        api.get('/api/v1/users/list').then(res => {
            this.setState({ users: res.data.results, filteredUsers: res.data.data });
        })
    }
    filteredResults() {
        let filterKeyValues = this.state.filterKeyValues;
        let ans = _.filter(this.state.users, (user) => {
            for (let [key, val] in Object.entries(filterKeyValues)) {
                return true;
                if (!user[key] || user[key].indexOf(val) == -1) return false;
            }
            return true;
        })
        return ans;
    }
    deleteUser(_id) {
        let url = `/users/delete/${_id}`;
        api.delete(url).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            toastr.error('Error', err.message, { transitionIn: 'bounceInDown', transitionOut: 'bounceOutUp' });
        });
    }
    getResults() {
        return this.filteredResults().map((user, index) => {
            return (
                <div className="card" key={index}>
                    <div className="d-flex detail">
                        <div className="icon"><i className="far fa-user"></i></div>
                        <div className="text">{user.name} <small>({user.rollNo})</small></div>
                    </div>
                    <div className="d-flex detail">
                        <div className="icon"><i className="fas fa-mobile-alt"></i></div>
                        <div className="text">{user.phone}</div>
                    </div>
                    <div className="d-flex detail">
                        <div className="icon"><i className="far fa-envelope-open"></i></div>
                        <div className="text">{user.email}</div>
                    </div>
                    <div className="d-flex detail">
                        <div className="icon"><i className="far fa-envelope-open"></i></div>
                        <div className="text">{user.year}</div>
                    </div>
                    <div className="d-flex detail">
                        <div className="icon"><i className="far fa-envelope-open"></i></div>
                        <div className="text">{user.campus}</div>
                    </div>
                    <div className="d-flex">
                        <div className="detail card-btn left-btn" onClick={this.props.showPopup("user", user)}>Edit</div>
                        <div className="detail card-btn right-btn" onClick={() => { this.deleteUser(user._id) }}>Del</div>
                    </div>
                </div>
            );
        })
    }
    componentDidMount() {
        this.getUsers();
    }
    render() {
        return (
            <div className="flex-row">
                {this.getResults()}
            </div>
        );
    }
}
export default Users;