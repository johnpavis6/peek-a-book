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

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: Object.keys(forms).map((form, index) => { return { label: forms[form].label, value: form } }),
            form: this.props.form || { selectedForm: 'user', fields: {}, errors: {} },
            scalePopup: this.props.showPopup
        }
        this.setForm = this.setForm.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    setForm(form) {
        let cForm = this.state.form;
        if (form.value == cForm.selectedForm) return;
        cForm.selectedForm = form.value;
        this.setState({ form: cForm });
        this.setState({ scalePopup: false }, () => { this.setState({ scalePopup: true }) });
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
    }
    getFieldError(key) {
        return this.state.form.errors[key];
    }
    getUserFormFields() {
        return (
            <div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Name"
                        onChange={(e) => { this.setFieldValue('name', e.target.value) }} />
                    <Error errors={this.getFieldError("name")} />
                </div>
                <div className="d-flex">
                    <div className="input-group col">
                        <input className="input-field w-100" type="text"
                            placeholder="Roll no"
                            onChange={(e) => { this.setFieldValue('rollNo', e.target.value) }} />
                        <Error errors={this.getFieldError("rollNo")} />
                    </div>
                    <div className="input-group col">
                        <input className="input-field w-100"
                            placeholder="Phone" type="text"
                            onChange={(e) => { this.setFieldValue('phone', e.target.value) }} />
                        <Error errors={this.getFieldError("phone")} />
                    </div>
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Email"
                        onChange={(e) => { this.setFieldValue('email', e.target.value) }} />
                    <Error errors={this.getFieldError("email")} />
                </div>
                <div className="d-flex">
                    <div className="input-group col">
                        <Select placeholder="Year"
                            options={this.getSelectOptions("years")}
                            onChange={(e) => { this.setFieldValue('year', e.label) }} />
                        <Error errors={this.getFieldError("year")} />
                    </div>
                    <div className="input-group col">
                        <Select placeholder="Campus"
                            options={this.getSelectOptions("campuses")}
                            onChange={(e) => { this.setFieldValue('campus', e.label) }} />
                        <Error errors={this.getFieldError("campus")} />
                    </div>
                </div>
                <div className="input-group">
                    <Select placeholder="Stay"
                        options={this.getSelectOptions("stayTypes")}
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
                        onChange={(e) => { this.setFieldValue('bookName', e.target.value) }} />
                    <Error errors={this.getFieldError("bookName")} />
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Subject name"
                        onChange={(e) => { this.setFieldValue('subjectName', e.target.value) }} />
                    <Error errors={this.getFieldError("subjectName")} />
                </div>
                <div className="input-group">
                    <input className="input-field w-100" type="text"
                        placeholder="Author name"
                        onChange={(e) => { this.setFieldValue('authorName', e.target.value) }} />
                    <Error errors={this.getFieldError("authorName")} />
                </div>
            </div>
        );
    }
    getBuyBookFormFields() {
        return (
            <div>
                <div className="input-group">
                    <Select placeholder="Select Student"
                        options={this.state.studentId}
                        onChange={(e) => { this.setFieldValue('studentId', e.value) }} />
                    <Error errors={this.getFieldError("studentId")} />
                </div>
                <div className="input-group">
                    <Select placeholder="Select Book"
                        options={this.state.bookId}
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
        let url = `/api/v1/${form.selectedForm}s/${(form.fields._id ? "edit" : "new")}`;
        api.post(url, form.fields).then(res => {
            console.log(res.data);
            toastr.success('Success', res.data.message, { transitionIn: 'bounceIn' });
        }).catch(err => { console.log(err); })
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
    componentWillReceiveProps(nextProps) {
        this.setState({ scalePopup: nextProps.showPopup });
    }
    hidePopup() {
        this.setState({ scalePopup: false }, () => { setTimeout(this.props.togglePopup, 500) });
    }
    dontClose(e) { e.stopPropagation() }
    getSelectLabelValue(value) {
        return { label: value, value: value };
    }
    render() {
        return (
            <div className={`popup popup-${this.props.showPopup}`}>
                <div className={`popup-container popup-blur-${this.state.scalePopup}`}
                    onClick={this.hidePopup}>
                    <div className={`popup-content scale-${this.state.scalePopup}`} onClick={this.dontClose}>
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