import Search from './Search';
import {BooksContext} from '../../contexts/BooksContext';
import React from 'react';
import { AuthorsContext } from '../../contexts/AuthorsContext';

export default (props)=> (
    <AuthorsContext>
    {
        ({
            allAuthors,
            getAllAuthors,
            authorsIsLoading
        })=>
            <BooksContext.Consumer>
                {({
                    allBooks,
                    getAllBooks,
                    booksIsLoading,
                }) =>         
                <Search 
                {...props}
                allAuthors={allAuthors}
                getAllAuthors={getAllAuthors}
                authorsIsLoading={authorsIsLoading}
                allBooks={allBooks}
                getAllBooks={getAllBooks}
                booksIsLoading={booksIsLoading}
                />
            }
            </BooksContext.Consumer>
    }
    </AuthorsContext>
);
