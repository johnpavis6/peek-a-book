import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Users from './container/Users.jsx'
import Books from './container/Books.jsx'
import Popup from './popup/Popup.jsx';
import './styles/App.scss'

class App extends Component {
    constructor() {
        super();
        this.state = {
            popupDisplay: false
        }
        this.togglePopupDisplay = this.togglePopupDisplay.bind(this);
        this.editPopup = this.editPopup.bind(this);
    }
    togglePopupDisplay() {
        this.setState({ popupDisplay: !this.state.popupDisplay });
    }
    editPopup(selectedForm, fields) {
        this.setState({ form: { selectedForm: selectedForm, fields: fields } }, this.togglePopupDisplay);
    }
    render() {
        return (
            <div className="flex-column h-100">
                <Router>
                    <div className="navbar d-flex position-relative">
                        <img className="icon" src="/images/logo.png"/>
                        <div className="navbar-brand d-flex">
                            <span>Peek a Book</span>
                        </div>
                        <div className="add-btn" onClick={this.togglePopupDisplay}><i className="fas fa-plus"></i></div>
                        {this.state.popupDisplay &&
                            <Popup form={this.state.form} togglePopupDisplay={this.togglePopupDisplay} />}
                    </div>
                    <div className="h-100 w-100 d-flex content">
                        <div className="content-menubar flex-column">
                            <Link className="link" to="/users/list"><i className="fas fa-user-graduate"></i></Link>
                            <Link className="link" to="/books/list"><i className="fas fa-book"></i></Link>
                        </div>
                        <div className="w-100 content-body flex-column">
                            <Route path="/users/list" render={() => (<Users editPopup={this.editPopup} />)} />
                            <Route path="/books/list" render={() => (<Books editPopup={this.editPopup} />)} />
                            <Route path="/buy-books/list" render={() => (<BuyBooks editPopup={this.editPopup} />)} />
                            <Route render={() => <Redirect to="/users/list" />} />
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;