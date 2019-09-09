import React from 'react';
import ListResults from '../templates/ListResults.jsx'
exports.routes = [
    {
        path: '/users/list',
        link: <i className="fas fa-user-graduate"></i>,
        RouteComponent: ListResults,
        selectedView: 'User',
    },
    {
        path: '/books/list',
        link: <i className="fas fa-book"></i>,
        RouteComponent: ListResults,
        selectedView: 'Book',
    },
    // {
    //     path: '/buy-books/list',
    //     link: <i className="fas fa-user-graduate"></i>,
    //     RouteComponent: ListResults,
    //     selectedView: 'Buy book',
    // },
]