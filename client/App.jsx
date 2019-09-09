import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Popup from './templates/Popup.jsx';
import Form from './templates/Form.jsx';
import { routes } from './config/routes';
import './styles/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.togglePopupDisplay = this.refs.popup.togglePopupDisplay.bind(this);
    }
    render() {
        return (
            <div className="flex-column h-100">
                <Router>
                    <div className="navbar d-flex position-relative">
                        <img className="icon" src="/images/logo.png" />
                        <div className="navbar-brand d-flex">
                            <span>Peek a Book</span>
                        </div>
                        <div className="add-btn" onClick={this.togglePopupDisplay}><i className="fas fa-plus"></i></div>
                        {<Popup showAtInitial={true} ref={"popup"} ChildComponent={Form} />}
                    </div>
                    <div className="h-100 w-100 d-flex content">
                        <div className="content-menubar flex-column">
                            {routes.map((o, i) => <Link key={i} className="link" to={o.path}>{o.link}</Link>)}
                        </div>
                        <div className="w-100 content-body flex-column">
                            {routes.map((o, i) => <Route path="/users/list" key={i}
                                render={() => <o.RouteComponent {...RouteComponentArgs} />} />)}
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;