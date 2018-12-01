import Dashboard from './Dashboard';
import {BooksContext} from '../../contexts/BookContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({getCurrentAuthorBooks, addBook, currentAuthorBooks, isLoading}) => <Dashboard {...props} isLoading={isLoading} addBook={addBook} currentAuthorBooks={currentAuthorBooks} getCurrentAuthorBooks={getCurrentAuthorBooks}/>}
    </BooksContext.Consumer>
);