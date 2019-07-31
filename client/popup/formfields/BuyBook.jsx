import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BuyBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyBook: this.props.buyBook || {},
        };
        this.setKeyValueWithPrev = this.setKeyValueWithPrev.bind(this);
        this.getValue = this.getValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    getValue(key) {
        let value = this.state.buyBook[key];
        return value ? { 'label': value, 'value': value } : this.state[key][0];
    }
    setKeyValueWithPrev(key, value) {
        let temp = this.state.buyBook;
        temp[key] = value;
        this.setState({ buyBook: temp }, () => {
            console.log(`this.state.buyBook::`, this.state.buyBook)
        });
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