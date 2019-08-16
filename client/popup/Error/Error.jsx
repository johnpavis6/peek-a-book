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

export function isEmail(val) {
    let errors = isEmpty(val);
    if (!val || !validator.isEmail(val)) errors.push("This field should be in email format")
    return errors;
}

export function isPhone(val) {
    let errors = isEmpty(val);
    if (!val || !validator.isPhone(val)) errors.push("This field should be in phone format")
    return errors;
}

export function isEmpty(val) {
    return (!val) ? ["This field is required"] : [];
}