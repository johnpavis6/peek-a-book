import React, { Component } from 'react';
import Select from 'react-select';
import Error from './Error.jsx';
import api from 'axios';
import { forms, formTypes } from '../config/forms';
import { toastr } from '../config/toastr';
import Common from '../config/Common';

class Form extends Component {
    constructor(props) {
        super(props);
        this.formTypes = Common.getOptionsLabelAsValues(Object.keys(forms));
        this.state = {
            selectedForm: null,
            defaultSelects: {}
        }
        this.setForm = this.setForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setForm(form) {
        let selectedForm = form ? form.value : null;
        if (selectedForm == this.state.selectedForm) return;
        this.setState({ selectedForm: selectedForm });
        this.props.scalePopup();
    }
    getSelectedFormLabel() {
        if (!this.state.selectedFormObj) return '';
        let form = this.state.form;
        let label = `${form.fields._id ? "Edit" : "New "} ${formTypes[form.selectedForm].label} Form`;
        return label;
    }
    setFieldValue(key, value) {
        this.state.form.fields[key] = value;
    }
    getFieldValue(key, forSelect = false) {
        let value = this.state.form.fields[key];
        return forSelect ? Common.getSelectLabelValue(value) : value || null;
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
    getField(data) {
        switch (data.type) {
            case 'input': return this.getInputTag(data.name, data.name);
            case 'select': return this.getSelectTag(data.name, data.options, data.name);
        }
    }
    getFormFields() {
        return this.state.selectedForm && (
            <div className="flex-wrap">
                {forms[this.state.selectedForm].fields.map(o => this.getField(o))}
            </div>
        );
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
    render() {
        return (
            <div className="form-container">
                <div className="popup-header">
                    <div className="popup-title d-flex">
                        <span className="m-auto">{this.getSelectedFormLabel()}</span>
                    </div>
                    <Select placeholder="Select form..."
                        defaultValue={Common.getSelectLabelValue(this.state.selectedForm)}
                        options={this.formTypes}
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