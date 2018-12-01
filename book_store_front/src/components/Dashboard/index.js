import Dashboard from './Dashboard';
import {BooksContext} from '../../contexts/BooksContext';
import React from 'react';
import { AuthorsContext } from '../../contexts/AuthorsContext';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({authorsIsLoading, getCurrentAuthor, currentAuthor}) => 
            <BooksContext.Consumer>
                {({
                    getCurrentAuthorBooks, 
                    addBook, 
                    currentAuthorBooks, 
                    booksIsLoading
                }) =>
                    <Dashboard 
                    {...props}
                    getCurrentAuthor={getCurrentAuthor}
                    authorsIsLoading={authorsIsLoading}
                    booksIsLoading={booksIsLoading}
                    addBook={addBook}
                    currentAuthor={currentAuthor}
                    currentAuthorBooks={currentAuthorBooks} 
                    getCurrentAuthorBooks={getCurrentAuthorBooks}/>}

            </BooksContext.Consumer>
    }
    </AuthorsContext.Consumer>
);