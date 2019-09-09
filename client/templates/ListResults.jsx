import React, { Component } from 'react';
import api from 'axios';
import _ from 'lodash';
import { forms } from '../config/forms';
import toastr from '../config/toastr';

class ListResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedViewObj: forms[this.props.selectedView],
            isLoading: true,
            results: [],
            filteredResults: [],
            filterKeyValues: {},
        }
        this.getResults = this.getResults.bind(this);
        this.filteredResults = this.filteredResults.bind(this);
    }
    getResults() {
        let url = `/api/v1/${this.state.selectedViewObj.url}/?`;
        api.get(url).then(res => {
            this.setState({
                results: res.data.results,
                filteredResults: res.data.data,
                isLoading: false
            });
        });
    }
    confirmDeleteEntry(_id) {
        let url = `/api/v1/${this.state.selectedViewObj.url}/${_id}`;
        api.delete(url).then(res => {
            toastr.success('Success', res.data.message, config.toastr.options);
            this.getResults();
        }).catch(err => {
            console.error("ERR", err);
            toastr('error', 'Error', err.message, config.toastr.options);
        });
    }
    deleteEntry(_id) {
        toastr.confirm('Are you sure?', () => { this.confirmDeleteEntry(_id) })
    }
    filteredResults() {
        let filterKeyValues = this.state.filterKeyValues;
        let ans = _.filter(this.state.results, (entry) => {
            for (let [key, val] in Object.entries(filterKeyValues)) {
                return true;
                if (!user[key] || user[key].indexOf(val) == -1) return false;
            }
            return true;
        })
        return ans;
    }
    getData() {
        let selectedViewObj = this.state.selectedViewObj;
        if ('renderData' in selectedViewObj) {
            return selectedViewObj.renderData(this);
        }
        return renderDataTemplate();
    }
    renderDataTemplate() { }
    componentWillMount() {
        this.getResults();
    }
    render() {
        return (
            <div className="flex-row">
                {this.getData()}
            </div>
        );
    }
}
export default ListResults;