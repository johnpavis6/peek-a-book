import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.book || {},
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
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Book name"
                        onChange={(e) => { this.state.fields.bookName = e.target.value }} autoFocus />
                    <Error errors={this.state.errors["bookName"]} />
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Subject name"
                        onChange={(e) => { this.state.fields.subjectName = e.target.value }} />
                    <Error errors={this.state.errors["subjectName"]} />
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Author name"
                        onChange={(e) => { this.state.fields.authorName = e.target.value }} />
                    <Error errors={this.state.errors["authorName"]} />
                </div>
                {this.props.getFormFooter()}
            </form>
        );
    }
}

export default Book;