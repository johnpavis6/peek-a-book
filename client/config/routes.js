import React, { Component } from 'react';
import ListResults from '../templates/ListResults.jsx'
exports.routes = [
    {
        path: '/users/list',
        link: <i className="fas fa-user-graduate"></i>,
        RouteComponent: ListResults,
        RouteComponentArgs: { getDataFor: 'users', renderData: 'getUsers' }
    },
    {
        path: '/books/list',
        link: <i className="fas fa-book"></i>,
        RouteComponent: ListResults,
        RouteComponentArgs: { getDataFor: 'books', renderData: 'getBooks' }
    },
    {
        path: '/buy-books/list',
        link: <i className="fas fa-user-graduate"></i>,
        RouteComponent: ListResults,
        RouteComponentArgs: { getDataFor: 'buybooks', renderData: 'getBuybooks' }
    },
]