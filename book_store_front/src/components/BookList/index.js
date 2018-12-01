import BookList from './BookList';
import {BooksContext} from '../../contexts/BookContext';
import React from 'react';

export default (props)=> (
    <BooksContext.Consumer>
        {({
            currentAuthorBooks, 
            getCurrentAuthorBooks, 
            allBooks,
            getAllBooks,
            authorBooks,
            getAuthorBooks,
            isLoading
        }) => 
                <BookList 
                {...props}
                authorBooks={authorBooks}
                getAuthorBooks={getAuthorBooks}
                allBooks={allBooks}
                getAllBooks={getAllBooks}
                isLoading={isLoading}
                currentAuthorBooks={currentAuthorBooks} 
                getCurrentAuthorBooks={getCurrentAuthorBooks}
                />}
    </BooksContext.Consumer>
);
