import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import { reducer as toastrReducer } from 'react-redux-toastr'
const reducers = {
    toastr: toastrReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

ReactDOM.render(<Provider store={store}>
    <App />
    <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
    />
</Provider>, document.getElementById('app'));