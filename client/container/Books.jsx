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

class Books extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            filterKeyValues: { name: "-" }
        }
        this.getResults = this.getResults.bind(this);
        this.filteredResults = this.filteredResults.bind(this);
        this.getRenderData = this.getRenderData.bind(this);
    }
    getResults() {
        api.get('/api/v1/books/all').then(res => {
            this.setState({ results: res.data.results, filteredResults: res.data.data });
        })
    }
    filteredResults() {
        let filterKeyValues = this.state.filterKeyValues;
        let ans = _.filter(this.state.results, (entry) => {
            for (let [key, val] in Object.entries(filterKeyValues)) {
                return true;
                if (!user[key] || user[key].indexOf(val) == -1) return false;
            }
            return true;
        })
        return ans;
    }
    deleteEntry(_id) {
        let url = `/book/${_id}`;
        api.delete(url).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            toastr.error('Error', err.message, { transitionIn: 'bounceInDown', transitionOut: 'bounceOutUp' });
        });
    }
    getRenderData() {
        return this.filteredResults().map((entry, index) => {
            return (
                <div className="card" key={index}>
                    <div className="d-flex detail">
                        <div className="icon"><i className="far fa-user"></i></div>
                        <div className="text">{entry.subjectName}</div>
                    </div>
                    <div className="d-flex detail">
                        <div className="icon"><i className="fas fa-mobile-alt"></i></div>
                        <div className="text">{entry.bookName}</div>
                    </div>
                    <div className="d-flex detail">
                        <div className="icon"><i className="far fa-envelope-open"></i></div>
                        <div className="text">{entry.authorName}</div>
                    </div>
                    <div className="d-flex">
                        <div className="detail card-btn left-btn"
                            onClick={() => { this.props.editPopup('book', entry) }}>Edit</div>
                        <div className="detail card-btn right-btn"
                            onClick={() => { this.deleteEntry(entry._id) }}>Del</div>
                    </div>
                </div>
            );
        })
    }
    componentWillMount() {
        this.getResults();
    }
    render() {
        return (
            <div className="flex-row">
                {this.getRenderData()}
            </div>
        );
    }
}
export default Books;