import React, { Component } from 'react';
import Select from 'react-select';
import Error from './Error.jsx';
import validator from './validator';
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
            defaultSelects: {},
            fields: {},
            errors: {},
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
        let { selectedForm, fields } = this.state;
        if (!selectedForm) return '';
        let label = `${fields._id ? "Edit" : "New "} ${selectedForm} Form`;
        return label;
    }
    setFieldValue(key, value) {
        this.state.fields[key] = value;
    }
    getFieldValue(key, forSelect = false) {
        let value = this.state.fields[key];
        return forSelect ? Common.getSelectLabelValue(value) : value || null;
    }
    getFieldError(key) {
        return this.state.errors && this.state.errors[key];
    }
    getInputTag(fieldName, label, i, placeholder = '') {
        let fieldValue = this.getFieldValue(fieldName);
        return (
            <div className="input-group" key={i}>
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
    getSelectTag(fieldName, options, label, i, placeholder = '', isMulti = false) {
        return (
            <div className="input-group" key={i}>
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
    getField(data, i) {
        switch (data.tag) {
            case 'input': return this.getInputTag(data.name, data.name, i);
            case 'select': return this.getSelectTag(data.name, data.options, data.name, i);
        }
    }
    getFormFields() {
        this.state.selectedForm && console.log("fields::", forms[this.state.selectedForm].fields)
        return this.state.selectedForm && (
            <div className="flex-wrap">
                {forms[this.state.selectedForm].fields.map((o, i) => this.getField(o, i))}
            </div>
        );
    }
    getFormFooter() {
        return (
            <div className="d-flex mt-1">
                <button className="ml-auto btn btn-success submit-btn" type="submit">Submit</button>
                <span className="mlr-1"></span>
                <button className="mr-auto btn btn-danger cancel-btn" type="button"
                    onClick={this.props.hidePopup}>Cancel</button>
            </div>
        );
    }
    submitForm() {
        let { selectedForm, fields } = this.state;
        let url = `/api/v1/${selectedForm}`;
        let method = fields._id ? "put" : "post";
        api[method](url, fields).then(res => {
            this.props.hidePopup();
            console.log(res.data);
            toastr.success('Success', res.data.message, toastrConfig.options);
        }).catch(err => {
            console.log(err);
            toastr.success('Error', err.message, toastrConfig.options);
        });
    }
    getErrors() {
        let errors = {}, hasError = false;
        let { selectedForm, fields } = this.state;
        let formFields = fields, selectedFormFields = forms[selectedForm].fields;
        selectedFormFields.forEach(o => {
            errors[o.name] = validator.isEmpty(formFields[o.name])
            if (errors[o.name].length) hasError = true;
        });
        return { errors: errors, hasError: hasError };
    }
    handleSubmit(e) {
        e.preventDefault();
        let { errors, hasError } = this.getErrors();
        this.setState({ errors: errors });
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