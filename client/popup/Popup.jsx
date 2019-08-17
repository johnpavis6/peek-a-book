import React, { Component } from 'react';
import Select from 'react-select';
import Error, * as validator from './Error/Error.jsx';
import api from 'axios';
import { toastr } from 'react-redux-toastr'

const forms = {
    "user": { label: "User", fields: ['name', 'rollNo', 'phone', 'email', 'year', 'campus', 'stayType'] },
    "book": { label: "Book", fields: ['bookName', 'subjectName', 'authorName'] },
    "buy-book": { label: "Buy Book", fields: ['studentId', 'bookId'] }
};
const options = { transitionIn: 'bounceInDown', transitionOut: 'bounceOutUp' };

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: Object.keys(forms).map((form, index) => { return { label: forms[form].label, value: form } }),
            form: this.props.form || { selectedForm: 'user', fields: {}, errors: {} },
            popupScale: true,
            defaultSelects: {}
        }
        this.scalePopup = this.scalePopup.bind(this);
        this.setForm = this.setForm.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUsers = this.setUsers.bind(this);
        this.setBooks = this.setBooks.bind(this);
    }
    getDefaultFieldOptions(type) {
        switch (type) {
            case "years": return [1, 2, 3, 4, 5];
            case "stayTypes": return ["Hosteller", "Dayscholar"];
            case "campuses": return ["CEG", "ACT", "SAP", "MIT"];
        }
        return [];
    }
    getSelectOptions(type) {
        let defaultFieldValues = this.getDefaultFieldOptions(type)
        let selectOptions = defaultFieldValues.map(o => { return { label: o, value: o } });
        return selectOptions;
    }
    getData(type, callback) {
        let url = `/api/v1/${type}/all`;
        api.get(url).then(callback).catch(err => { console.error(err) });
    }
    setUsers(resp) {
        let data=resp.data.results;
        let users = data.map(o => { return { label: `${o.name}-${o.rollNo}`, value: o._id } });
        this.state.defaultSelects.users = users;
        this.forceUpdate();
    }
    setBooks(resp) {
        let data=resp.data.results;
        let books = data.map(o => { return { label: o.bookName, value: o._id } });
        this.state.defaultSelects.books = books;
        this.forceUpdate();
    }
    scalePopup() {
        this.setState({ popupScale: false }, () => { this.setState({ popupScale: true }) });
    }
    setForm(form) {
        let cForm = this.state.form;
        if (form.value == cForm.selectedForm) return;
        cForm.selectedForm = form.value;
        this.setState({ form: cForm });
        this.scalePopup();
    }
    getSelectedFormLabel() {
        let form = this.state.form;
        let label = `${form.fields._id ? "Edit" : "New "} ${forms[form.selectedForm].label} Form`;
        return label;
    }
    getFormFields() {
        let selectedForm = this.state.form.selectedForm;
        switch (selectedForm) {
            case 'user': return this.getUserFormFields();
            case 'book': return this.getBookFormFields();
            case 'buy-book': return this.getBuyBookFormFields();
        }
    }
    setFieldValue(key, value) {
        this.state.form.fields[key] = value;
        this.forceUpdate();
    }
    getFieldValue(key, forSelect = false) {
        let value = this.state.form.fields[key];
        return !forSelect ? value : value ? this.getSelectLabelValue(value) : null;
    }
    getFieldError(key) {
        return this.state.form.errors && this.state.form.errors[key];
    }
    getUserFormFields() {
        return (
            <div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Name"
                        value={this.getFieldValue('name')}
                        onChange={(e) => { this.setFieldValue('name', e.target.value) }} />
                    <Error errors={this.getFieldError("name")} />
                </div>
                <div className="d-flex">
                    <div className="input-group col">
                        <input className="input-field w-100" type="text"
                            placeholder="Roll no"
                            value={this.getFieldValue('rollNo')}
                            onChange={(e) => { this.setFieldValue('rollNo', e.target.value) }} />
                        <Error errors={this.getFieldError("rollNo")} />
                    </div>
                    <div className="input-group col">
                        <input className="input-field w-100"
                            placeholder="Phone" type="text"
                            value={this.getFieldValue('phone')}
                            onChange={(e) => { this.setFieldValue('phone', e.target.value) }} />
                        <Error errors={this.getFieldError("phone")} />
                    </div>
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Email"
                        value={this.getFieldValue('email')}
                        onChange={(e) => { this.setFieldValue('email', e.target.value) }} />
                    <Error errors={this.getFieldError("email")} />
                </div>
                <div className="d-flex">
                    <div className="input-group col">
                        <Select placeholder="Year"
                            options={this.getSelectOptions("years")}
                            value={this.getFieldValue('year', true)}
                            onChange={(e) => { this.setFieldValue('year', e.label) }} />
                        <Error errors={this.getFieldError("year")} />
                    </div>
                    <div className="input-group col">
                        <Select placeholder="Campus"
                            options={this.getSelectOptions("campuses")}
                            value={this.getFieldValue('campus', true)}
                            onChange={(e) => { this.setFieldValue('campus', e.label) }} />
                        <Error errors={this.getFieldError("campus")} />
                    </div>
                </div>
                <div className="input-group">
                    <Select placeholder="Stay"
                        options={this.getSelectOptions("stayTypes")}
                        value={this.getFieldValue('stayType', true)}
                        onChange={(e) => { this.setFieldValue('stayType', e.label) }} />
                    <Error errors={this.getFieldError("stayType")} />
                </div>
            </div>
        );
    }
    getBookFormFields() {
        return (
            <div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Book name"
                        value={this.getFieldValue('bookName')}
                        onChange={(e) => { this.setFieldValue('bookName', e.target.value) }} />
                    <Error errors={this.getFieldError("bookName")} />
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Subject name"
                        value={this.getFieldValue('subjectName')}
                        onChange={(e) => { this.setFieldValue('subjectName', e.target.value) }} />
                    <Error errors={this.getFieldError("subjectName")} />
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Author name"
                        value={this.getFieldValue('authorName')}
                        onChange={(e) => { this.setFieldValue('authorName', e.target.value) }} />
                    <Error errors={this.getFieldError("authorName")} />
                </div>
            </div>
        );
    }
    getBuyBookFormFields() {
        this.getData('users', this.setUsers);
        this.getData('books', this.setBooks);
        return (
            <div>
                <div className="input-group">
                    <Select placeholder="Select Student"
                        options={this.state.defaultSelects.students}
                        value={this.getFieldValue('studentId', true)}
                        onChange={(e) => { this.setFieldValue('studentId', e.value) }} />
                    <Error errors={this.getFieldError("studentId")} />
                </div>
                <div className="input-group">
                    <Select placeholder="Select Book"
                        options={this.state.bookId}
                        value={this.getFieldValue('bookId', true)}
                        onChange={(e) => { this.setFieldValue('bookId', e.value) }} />
                    <Error errors={this.getFieldError("bookId")} />
                </div>
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
            toastr.success('Success', res.data.message, options);
        }).catch(err => {
            console.log(err);
            toastr.success('Error', err.message, options);
        })
    }
    getSelectedFormFields() { return forms[this.state.form.selectedForm].fields; }
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
    hidePopup() {
        this.setState({ popupScale: false }, () => { setTimeout(this.props.togglePopupDisplay, 500) });
    }
    dontClose(e) { e.stopPropagation() }
    getSelectLabelValue(value) { return { label: value, value: value }; }
    render() {
        return (
            <div className={`popup`}>
                <div className={`popup-container popup-blur-${this.state.popupScale}`}
                    onClick={this.hidePopup}>
                    <div className={`popup-content scale-${this.state.popupScale}`} onClick={this.dontClose}>
                        <div className="popup-header">
                            <div className="popup-title d-flex">
                                <span className="m-auto">{this.getSelectedFormLabel()}</span>
                            </div>
                            <Select placeholder="Select Form *"
                                value={this.getSelectLabelValue(forms[this.state.form.selectedForm].label)}
                                options={this.state.forms}
                                onChange={this.setForm} />
                        </div>
                        <div className="popup-body">
                            <form onSubmit={this.handleSubmit}>
                                {this.getFormFields()}
                                {this.getFormFooter()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStudent;