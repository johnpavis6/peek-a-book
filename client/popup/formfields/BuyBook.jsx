import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BuyBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyBook: this.props.buyBook || {},
            fields: this.props.fields || {},
            errors: this.props.errors || {}
        };
        this.validateFields = this.validateFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateFields() {
        return _.maxBy(Object.values(this.state.errors), o => { return o.length });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.fields);
    }
    render() {
        return (
            <div>
                <Select className="form-field" />
                <Select className="form-field" />
                <DatePicker className="form-field"
                    onChange={(date) => { this.setKeyValueWithPrev("date", date) }}
                    selected={new Date()} />
            </div>
        );
    }
}

export default BuyBook;