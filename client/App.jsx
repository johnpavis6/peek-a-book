import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Users from './container/Users.jsx'
import Books from './container/Books.jsx'
import Popup from './popup/Popup.jsx';
import '../public/scss/App.scss'

class App extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: true
        }
        this.togglePopup = this.togglePopup.bind(this);
    }
    togglePopup() {
        this.setState({ showPopup: true });
    }
    render() {
        return (
            <div className="flex-column h-100">
                <Router>
                    <div className="navbar d-flex position-relative">
                        <div className="icon d-flex"><span className="m-auto">PaB</span></div>
                        <div className="navbar-brand d-flex">
                            <span>Peek a Book</span>
                        </div>
                        <div className="add-btn" onClick={this.togglePopup}><i className="fas fa-plus"></i></div>
                        <Popup showPopup={this.state.showPopup} />
                    </div>
                    <div className="h-100 d-flex content">
                        <div className="content-menubar flex-column">
                            <Link className="link" to="/users/new"><i className="fas fa-user-graduate"></i></Link>
                            <Link className="link" to="/books/new"><i className="fas fa-book"></i></Link>
                        </div>
                        <div className="w-100 content-body">
                            <Route path="/students/list" render={() => (<Users />)} />
                            <Route path="/books/list" render={() => (<Books />)} />
                            <Route path="/buy-books/list" render={() => (<BuyBooks />)} />
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;