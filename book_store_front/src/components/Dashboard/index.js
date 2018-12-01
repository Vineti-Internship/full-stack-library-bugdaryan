import Dashboard from './Dashboard';
import {BooksContext} from '../../contexts/BooksContext';
import React from 'react';
import { AuthorsContext } from '../../contexts/AuthorsContext';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({}) => 
        <BooksContext.Consumer>
            {({getCurrentAuthorBooks, addBook, currentAuthorBooks, booksIsLoading}) => <Dashboard {...props} booksIsLoading={booksIsLoading} addBook={addBook} currentAuthorBooks={currentAuthorBooks} getCurrentAuthorBooks={getCurrentAuthorBooks}/>}
        </BooksContext.Consumer>
    }
    </AuthorsContext.Consumer>
);