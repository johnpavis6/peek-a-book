import React, { Component } from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr'
import User from './formfields/User.jsx';
import Book from './formfields/Book.jsx';
import BookBought from './formfields/BuyBook.jsx';
import api from 'axios'

const forms = ["User", "Book", "Buy Book"];
const urls = ["users", "books", "buyBooks"];

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: forms.map((form, index) => { return { label: form, value: index } }),
            form: this.props.form || { selectedForm: 0, fields: {}, errors: {} },
        }
        this.setForm = this.setForm.bind(this);
        this.getForm = this.getForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.setKeyValue = this.setKeyValue.bind(this);
        this.getKeyValue = this.getKeyValue.bind(this);
        this.getKeyErrors = this.getKeyErrors.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    setForm(form) {
        let cForm = this.state.form;
        cForm.selectedForm = form.value;
        this.setState({ form: cForm });
    }
    getForm() {
        let selectedForm = this.state.form.selectedForm;
        let args = {
            setKeyValue: this.setKeyValue, getKeyValue: this.getKeyValue,
            getKeyErrors: this.getKeyErrors, setErrors: this.setErrors
        };
        switch (selectedForm) {
            case 0: return <User ref={0} {...args} />
            case 1: return <Book ref={1} {...args} />
            case 2: return <BookBought ref={2} {...args} />
            case 3: return <Sell ref={3} {...args} />
        }
    }
    getFormLabel() {
        return forms[this.state.form.selectedForm];
    }
    setKeyValue(key, value) {
        let form = this.state.form;
        form.fields[key] = value;
        this.setState({ form: form });
    }
    getKeyValue(key, asDic = false) {
        let value = this.state.form.fields[key];
        if (!asDic) return value || '';
        return value ? { label: value, value: value } : null;
    }
    getKeyErrors(key) {
        return this.state.form.errors[key] || [];
    }
    setErrors(errors) {
        this.state.form.errors = errors;
    }
    formatFormName(ind) {
        let name = forms[ind].toLowerCase().replace(/ ./gi, (x) => { x[1].toUpperCase() });
        return name;
    }
    submitData() {
        let form = this.state.form;
        let url = '/api/v1/' + urls[form.selectedForm] + '/' + (form.isSpecific ? "update" : "new");
        let data = { method: 'post', body: form.fields };
        api.post(
            url, data
        ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    submitForm(e) {
        e.preventDefault();
        toastr.clean();
        let hasError = this.refs[this.state.form.selectedForm].validateFields(this.state.form.fields);
        if (!hasError) { return this.submitData() }
        toastr.error("Error", "Fields doesn't matches the requirement");
        this.forceUpdate();
    }
    render() {
        let form = this.state.form;
        return (
            <div>
                {this.props.showPopup &&
                    <div className="popup">
                        <div className="popup-blur" />
                        <div className="popup-container">
                            <div className="popup-content scale-animate">
                                <div className="popup-header">
                                    <div className="popup-title d-flex">
                                        <span className="m-auto">
                                            {form.isSpecific ? "Edit" : "New"}
                                            &nbsp;{this.getFormLabel()}&nbsp;Form
                                        </span>
                                    </div>
                                    <Select placeholder="Select Form *"
                                        value={this.state.forms[this.state.form.selectedForm]}
                                        options={this.state.forms}
                                        onChange={this.setForm} />
                                </div>
                                <div className="popup-body">
                                    <form onSubmit={this.submitForm}>
                                        {this.getForm()}
                                        <div className="d-flex mt-1">
                                            <button className="ml-auto btn btn-success save-btn">Save</button>
                                            <span className="mlr-1"></span>
                                            <button className="mr-auto btn btn-danger cancel-btn">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default AddStudent;