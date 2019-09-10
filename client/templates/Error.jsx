import React, { Component } from 'react';
import 'styles/Error.scss'

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