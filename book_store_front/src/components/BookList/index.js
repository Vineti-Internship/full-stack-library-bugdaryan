import BookList from './BookList';
import {BooksContext} from '../../contexts/BooksContext';
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
            booksIsLoading,
            removeBook
            }) =>         
                <BookList 
                    {...props}
                    removeBook={removeBook}
                    authorBooks={authorBooks}
                    getAuthorBooks={getAuthorBooks}
                    allBooks={allBooks}
                    getAllBooks={getAllBooks}
                    booksIsLoading={booksIsLoading}
                    currentAuthorBooks={currentAuthorBooks} 
                    getCurrentAuthorBooks={getCurrentAuthorBooks}
                />
        }
    </BooksContext.Consumer>
);
