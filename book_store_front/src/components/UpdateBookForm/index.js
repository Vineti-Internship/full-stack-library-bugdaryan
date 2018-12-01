import UpdateBookForm from './UpdateBookForm';
import {BooksContext} from '../../contexts/BookContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({
            updateBook,
            isLoading
        }) => 
                <UpdateBookForm 
                    {...props}
                    updateBook={updateBook}
                    isLoading={isLoading} />}
    </BooksContext.Consumer>
);