import React, { Component } from 'react';

class Books extends Component {
    render() {
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Price</th>
                        <th scope="col">Available</th>
                    </tr>
                </thead>
                <tbody id="btable">

                </tbody>
            </table>
        );
    }
}

export default Books;