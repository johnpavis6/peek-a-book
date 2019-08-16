import React, { Component } from 'react';
import Select from 'react-select';
import Error, * as validator from './Error/Error.jsx';
import _ from 'lodash';
import api from 'axios';
import { toastr } from 'react-redux-toastr'

const fields = ['name', 'rollNo', 'phone', 'email', 'year', 'campus', 'stayType'];
const years = [1, 2, 3, 4, 5];
const stayTypes = ["Hosteller", "Dayscholar"];
const campuses = ["CEG", "ACT", "SAP", "MIT"];

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: years.map((opt) => { return { label: opt, value: opt } }),
            stayTypes: stayTypes.map((opt) => { return { label: opt, value: opt } }),
            campuses: campuses.map((opt) => { return { label: opt, value: opt } }),
            fields: this.props.fields || {},
            errors: {}
        };
        this.getErrors = this.getErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentWillReceiveProps() {
        this.setState({ errors: {} });
    }
    getErrors() {
        let errors = {}, hasError = false;
        fields.forEach(o => {
            errors[o] = validator.isEmpty(this.state.fields[o])
            if (errors[o].length) hasError = true;
        });
        return { errors: errors, hasError: false };
    }
    submitForm() {
        let url = '/api/v1/users/' + (this.state.fields.id ? "edit" : "new");
        api.post(url, this.state.fields).then(res => {
            console.log(res.data);
            toastr.success('Success', res.data.message, { transitionIn: 'bounceIn' });
        }).catch(err => { console.log(err); })
    }
    handleSubmit(e) {
        e.preventDefault();
        let { errors, hasError } = this.getErrors();
        this.setState({ errors: errors });
        if (hasError) { return; }
        this.submitForm();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Name"
                        onChange={(e) => { this.state.fields.name = e.target.value }} autoFocus />
                    <Error errors={this.state.errors["name"]} />
                </div>
                <div className="d-flex">
                    <div className="input-group col">
                        <input className="input-field w-100" type="text"
                            placeholder="Roll no"
                            onChange={(e) => { this.state.fields.rollNo = e.target.value }} />
                        <Error errors={this.state.errors["rollNo"]} />
                    </div>
                    <div className="input-group col">
                        <input className="input-field w-100"
                            placeholder="Phone" type="text"
                            onChange={(e) => { this.state.fields.phone = e.target.value }} />
                        <Error errors={this.state.errors["phone"]} />
                    </div>
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Email"
                        onChange={(e) => { this.state.fields.email = e.target.value }} />
                    <Error errors={this.state.errors["email"]} />
                </div>
                <div className="d-flex">
                    <div className="input-group col">
                        <Select placeholder="Year"
                            options={this.state.years}
                            onChange={(e) => { this.state.fields.year = e.label }} />
                        <Error errors={this.state.errors["year"]} />
                    </div>
                    <div className="input-group col">
                        <Select placeholder="Campus"
                            options={this.state.campuses}
                            onChange={(e) => { this.state.fields.campus = e.label }} />
                        <Error errors={this.state.errors["campus"]} />
                    </div>
                </div>
                <div className="input-group">
                    <Select placeholder="Stay"
                        options={this.state.stayTypes}
                        onChange={(e) => { this.state.fields.stayType = e.label }} />
                    <Error errors={this.state.errors["campus"]} />
                </div>
                {this.props.getFormFooter()}
            </form>
        );
    }
}

export default User;