import React, { Component } from 'react';

class BuyBooks extends Component {
    render() {
        return (
            <form method="POST" action="/dashboard/addStudentForm">
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <label htmlFor="roll_no" className="input-group-text">
                            Roll No
            </label>
                    </div>
                    <input name="roll_no" id="roll_no" className="form-control bg-white" type="number" pattern="\d{10}"
                        title="Please match the required format" required />
                </div>

                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <label htmlFor="book_bought" className="input-group-text">
                            Books
            </label>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" ng-click="inc('book_bought')"
                            ng-disabled="tag_disabled">+</button>
                    </div>
                </div>
                <div className="row">
                    <div className="input-group form-group col-12 flex-nowrap" ng-repeat="exp in data.book_bought track by $index">
                        <div className="input-group-prepend">
                            <label className="input-group-text"></label>
                        </div>
                        <input ng-model="data.book_bought[$index].name" name="book_bought" type="text" ng-disabled="tag_disabled"
                            placeholder="Book Name" className="form-control bg-white" />
                        <input ng-model="data.book_bought[$index].author" name="book_bought" type="text" ng-disabled="tag_disabled"
                            placeholder="Author" className="form-control bg-white" />
                        <input ng-model="data.book_bought[$index].subject" name="book_bought" type="text" ng-disabled="tag_disabled"
                            placeholder="Subject" className="form-control bg-white" />
                        <input ng-model="data.book_bought[$index].price" name="book_bought" type="number" min='1'
                            ng-disabled="tag_disabled" placeholder="Price" className="form-control bg-white" />
                        <input ng-model="data.book_bought[$index].quantity" name="book_bought" type="number" min='1'
                            ng-disabled="tag_disabled" placeholder="Quantity" className="form-control bg-white" />
                        <input ng-model="data.book_bought[$index].tot_price" name="book_bought" type="number"
                            ng-value="data.book_bought[$index].price * data.book_bought[$index].quantity" ng-disabled="tag_disabled"
                            className="form-control bg-white" readOnly />
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" ng-click="dec('book_bought',$index)"
                                ng-disabled="tag_disabled">-</button>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Add Student</button>
            </form>
        );
    }
}

export default BuyBooks;