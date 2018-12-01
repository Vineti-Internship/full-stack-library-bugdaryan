import AddBookForm from './AddBookForm';
import {BooksContext} from '../../contexts/BooksContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({addBook}) => <AddBookForm {...props} addBook={addBook}/>}
    </BooksContext.Consumer>
);