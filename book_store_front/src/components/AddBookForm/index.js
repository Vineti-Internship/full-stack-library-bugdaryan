import AddBookForm from './AddBookForm';
import {BooksContext} from '../../contexts/BookContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({addBook}) => <AddBookForm {...props} addBook={addBook}/>}
    </BooksContext.Consumer>
);