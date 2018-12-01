import UpdateBookForm from './UpdateBookForm';
import {BooksContext} from '../../contexts/BooksContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({
            updateBook,
            booksIsLoading
        }) => 
                <UpdateBookForm 
                    {...props}
                    updateBook={updateBook}
                    booksIsLoading={booksIsLoading} />}
    </BooksContext.Consumer>
);