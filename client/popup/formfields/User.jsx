import React, { Component } from 'react';
import Select from 'react-select';
import Error, * as validator from '../Error/Error.jsx';
import _ from 'lodash';

const years = [1, 2, 3, 4, 5];
const stayTypes = ["Hosteller", "Dayscholar"];
const campuses = ["CEG", "ACT", "SAP", "MIT"];



class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: years.map((opt, index) => { return { label: opt, value: index } }),
            stayTypes: stayTypes.map((opt, index) => { return { label: opt, value: index } }),
            campuses: campuses.map((opt, index) => { return { label: opt, value: index } }),
        };
    }
    validateFields(fields) {
        let errors = {};
        // errors.email = validator.isEmail(fields.email);
        // errors.phone = validator.isPhone(fields.phone);
        this.props.setErrors(errors);
        return _.maxBy(Object.values(errors), o => { return o.length });
    }
    render() {
        return (
            <div>
                <input className="input-field" type="text"
                    placeholder="Name"
                    value={this.props.getKeyValue("name")}
                    onChange={(e) => { this.props.setKeyValue("name", e.target.value) }} autoFocus />
                <Error errors={this.props.getKeyErrors("name")} />
                <input className="input-field" type="text"
                    placeholder="Roll no"
                    value={this.props.getKeyValue("rollNo")}
                    onChange={(e) => { this.props.setKeyValue("rollNo", e.target.value) }} />
                <Error errors={this.props.getKeyErrors("rollNo")} />
                <input className="input-field"
                    placeholder="Phone" type="text"
                    value={this.props.getKeyValue("phone")}
                    onChange={(e) => { this.props.setKeyValue("phone", e.target.value) }} />
                <Error errors={this.props.getKeyErrors("phone")} />
                <input className="input-field" type="text"
                    placeholder="Email"
                    value={this.props.getKeyValue("email")}
                    onChange={(e) => { this.props.setKeyValue("email", e.target.value) }} />
                <Error errors={this.props.getKeyErrors("email")} />
                <Select className="form-field"
                    placeholder="Year"
                    value={this.props.getKeyValue("year", true)}
                    options={this.state.years}
                    onChange={(e) => { this.props.setKeyValue("year", e.label) }} />
                <Error errors={this.props.getKeyErrors("year")} />
                <Select
                    className="form-field"
                    placeholder="Campus"
                    value={this.props.getKeyValue("campus", true)}
                    options={this.state.campuses}
                    onChange={(e) => { this.props.setKeyValue("campus", e.label) }} />
                <Error errors={this.props.getKeyErrors("campus")} />
                <Select
                    className="form-field"
                    placeholder="Stay"
                    value={this.props.getKeyValue("stayType", true)}
                    options={this.state.stayTypes}
                    onChange={(e) => { this.props.setKeyValue("stayType", e.label) }} />
                <Error errors={this.props.getKeyErrors("campus")} />
            </div>
        );
    }
}

export default Student;