import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.book || {},
        };
        this.setKeyValueWithPrev = this.setKeyValueWithPrev.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    getValue(key) {
        let value = this.state.book[key];
        return value ? { 'label': value, 'value': value } : this.state[key][0];
    }
    setKeyValueWithPrev(key, value) {
        let temp = this.state.book;
        temp[key] = value;
        this.setState({ book: temp }, () => {
            console.log(`this.state.book::`, this.state.book)
        });
    }
    render() {
        return (
            <div>
                <input className="input-field"
                    placeholder="Subject"
                    onChange={(e) => { this.setKeyValueWithPrev("subject", e.target.value) }} />
                <input className="input-field"
                    placeholder="Name"
                    onChange={(e) => { this.setKeyValueWithPrev("name", e.target.value) }} />
                <input className="input-field"
                    placeholder="Author Name"
                    onChange={(e) => { this.setKeyValueWithPrev("authorName", e.target.value) }} />
            </div>
        );
    }
}

export default Book;