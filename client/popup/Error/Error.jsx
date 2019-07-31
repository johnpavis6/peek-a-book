import React, { Component } from 'react';
import './Error.scss'

class Error extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let errors = this.props.errors || [];
        if (typeof (errors) == "string") errors = [errors];
        return (
            <div className="error-container">
                {
                    errors.map((message, index) => {
                        return <div key={index} className="error-message">*&nbsp;{message}&nbsp;</div>
                    })
                }
            </div>
        );
    }
}

export default Error;

import validator from 'validator';

export function isEmail(email) {
    let errors = [];
    if (!email) errors.push("This field is required");
    if (!email || !validator.isEmail(email)) errors.push("This field should be in email format")
    return errors;
}

export function isPhone(phone) {
    let errors = [];
    if (!phone) errors.push("This field is required");
    if (!phone || !validator.isPhone(phone)) errors.push("This field should be in phone format")
    return errors;
}