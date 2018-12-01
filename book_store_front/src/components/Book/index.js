import Book from './Book';
import {BooksContext} from '../../contexts/BookContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({currentBook, getCurrentBook, isLoading}) => 
            <Book 
                {...props} 
                currentBook={currentBook} 
                getCurrentBook={getCurrentBook}
                isLoading={isLoading}
            />}
    </BooksContext.Consumer>
);