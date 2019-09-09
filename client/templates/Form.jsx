import React, { Component } from 'react';
import Select from 'react-select';
import Error from './Error.jsx';
import api from 'axios';
import { toastr } from 'react-redux-toastr'
import { formConfig, toastrConfig } from '../config/index';

const formTypes = formConfig.formTypes;
const defaultForm = formConfig.defaultForm;

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: formConfig.forms,
            form: this.props.form || defaultForm,
            defaultSelects: {}
        }
        this.setForm = this.setForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUsers = this.setUsers.bind(this);
        this.setBooks = this.setBooks.bind(this);
    }
    getData(type, callback) {
        let url = `/api/v1/${type}/all`;
        api.get(url).then(callback).catch(err => { console.error(err) });
    }
    setUsers(resp) {
        let data = resp.data.results;
        let users = data.map(o => { return { label: `${o.name}-${o.rollNo}`, value: o._id } });
        this.state.defaultSelects.users = users;
        this.forceUpdate();
    }
    setBooks(resp) {
        let data = resp.data.results;
        let books = data.map(o => { return { label: o.bookName, value: o._id } });
        this.state.defaultSelects.books = books;
        this.forceUpdate();
    }
    setForm(form) {
        let cForm = this.state.form;
        console.log("selectedForm1", form)
        if (form.value == cForm.selectedForm) return;
        cForm.selectedForm = form.value;
        this.setState({ form: cForm });
        this.props.scalePopup();
    }
    getSelectedFormLabel() {
        let form = this.state.form;
        console.log("selectedForm", form.selectedForm)
        let label = `${form.fields._id ? "Edit" : "New "} ${formTypes[form.selectedForm].label} Form`;
        return label;
    }
    getFormFields() {
        let selectedForm = this.state.form.selectedForm;
        // switch (selectedForm) {
        //     case 'user': return this.getUserFormFields();
        //     case 'book': return this.getBookFormFields();
        //     case 'buy-book': return this.getBuyBookFormFields();
        // }
    }
    setFieldValue(key, value) {
        this.state.form.fields[key] = value;
        this.forceUpdate();
    }
    getFieldValue(key, forSelect = false) {
        let value = this.state.form.fields[key];
        return !forSelect ? value || '' : value ? this.getSelectLabelValue(value) : null;
    }
    getFieldError(key) {
        return this.state.form.errors && this.state.form.errors[key];
    }
    getInputTag(fieldName, label, placeholder = '') {
        let fieldValue = this.getFieldValue(fieldName);
        return (
            <div className="input-group">
                <div className={`input-container flex-column`}>
                    <label className="label" htmlFor={`input-${fieldName}`}>{label}</label>
                    <input className="input-field w-100" type="text"
                        id={`input-${fieldName}`}
                        placeholder={placeholder}
                        defaultValue={fieldValue}
                        onChange={(e) => { this.setFieldValue(fieldName, e.target.value) }} />
                </div>
                <Error errors={this.getFieldError(fieldName)} />
            </div>
        );
    }
    getSelectTag(fieldName, options, label, placeholder = '', isMulti = false) {
        return (
            <div className="input-group">
                <div className={`input-container flex-column`}>
                    <label className="label" htmlFor={`input-${fieldName}`}>{label}</label>
                    <Select placeholder={placeholder}
                        options={options}
                        isMulti={isMulti}
                        defaultValue={this.getFieldValue(fieldName, true)}
                        onChange={(e) => { this.setFieldValue(fieldName, e.label) }} />
                    <Error errors={this.getFieldError(fieldName)} />
                </div>
            </div>
        );
    }
    getUserFormFields() {
        return (
            <div className="flex-wrap">
                {this.getInputTag('name', 'Name')}
                {this.getInputTag('rollNo', 'Roll no')}
                {this.getInputTag('phone', 'Phone')}
                {this.getInputTag('email', 'Email')}
                {this.getSelectTag('department', formTypes.user.fields.department.options, 'Department')}
                {this.getSelectTag('year', formTypes.user.fields.year.options, 'Year')}
                {this.getSelectTag('campus', formTypes.user.fields.campus.options, 'Campus')}
                {this.getSelectTag('stayType', formTypes.user.fields.stayType.options, 'Stay Type')}
            </div>
        );
    }
    getBookFormFields() {
        return (
            <div>
                {this.getInputTag('bookName', 'Book name')}
                {this.getInputTag('subjectName', 'Subject name')}
                {this.getInputTag('authorName', 'Author name')}
            </div>
        );
    }
    getBuyBookFormFields() {
        return (
            <div>
                {this.getSelectTag('studentId', 'campuses', 'Student')}
                {this.getSelectTag('bookId', 'campuses', 'Book')}
            </div>
        )
    }
    getFormFooter() {
        return (
            <div className="d-flex mt-1">
                <button className="ml-auto btn btn-success submit-btn" type="submit">Submit</button>
                <span className="mlr-1"></span>
                <button className="mr-auto btn btn-danger cancel-btn" type="button"
                    onClick={this.hidePopup}>Cancel</button>
            </div>
        );
    }
    submitForm() {
        let form = this.state.form;
        let url = `/api/v1/${form.selectedForm}`;
        let method = form.fields._id ? "put" : "post";
        api[method](url, form.fields).then(res => {
            this.hidePopup();
            console.log(res.data);
            toastr.success('Success', res.data.message, toastrConfig.options);
        }).catch(err => {
            console.log(err);
            toastr.success('Error', err.message, toastrConfig.options);
        })
    }
    getSelectedFormFields() { return Object.keys(formTypes[this.state.form.selectedForm].fields); }
    getErrors() {
        let errors = {}, hasError = false;
        let formFields = this.state.form.fields, selectedFormFields = this.getSelectedFormFields();
        selectedFormFields.forEach(o => {
            errors[o] = validator.isEmpty(formFields[o])
            if (errors[o].length) hasError = true;
        });
        return { errors: errors, hasError: hasError };
    }
    setErrors(errors) {
        this.state.form.errors = errors;
        this.forceUpdate();
    }
    handleSubmit(e) {
        e.preventDefault();
        let { errors, hasError } = this.getErrors();
        this.setErrors(errors);
        if (hasError) { return; }
        this.submitForm();
    }
    getSelectLabelValue(value) { return { label: value, value: value }; }
    render() {
        return (
            <div className="form-container">
                <div className="popup-header">
                    <div className="popup-title d-flex">
                        <span className="m-auto">{this.getSelectedFormLabel()}</span>
                    </div>
                    <Select placeholder="Select Form *"
                        value={this.getSelectLabelValue(formTypes[this.state.form.selectedForm].label)}
                        options={this.state.forms}
                        onChange={this.setForm} />
                </div>
                <div className="popup-body">
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        {this.getFormFields()}
                        {this.getFormFooter()}
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;