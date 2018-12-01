import Book from './Book';
import {BooksContext} from '../../contexts/BooksContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({book, getBook, booksIsLoading}) => 
            <Book 
                {...props} 
                book={book} 
                getBook={getBook}
                booksIsLoading={booksIsLoading}
            />}
    </BooksContext.Consumer>
);