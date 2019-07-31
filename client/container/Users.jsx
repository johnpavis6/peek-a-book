import React, { Component } from 'react';

class Students extends Component {
    render() {
        return (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Roll No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Department</th>
                        <th scope="col">Year</th>
                        <th scope="col">Stay</th>
                        <th scope="col">Campus</th>
                    </tr>
                </thead>
                <tbody id="btable">
                </tbody>
            </table>
        );
    }
}
export default Students;