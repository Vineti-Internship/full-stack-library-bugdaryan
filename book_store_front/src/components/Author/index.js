import Author from './Author';
import {AuthorsContext} from '../../contexts/AuthorsContext';
import React from 'react';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({author, getAuthor, authorsIsLoading}) => 
            <Author 
                {...props} 
                author={author} 
                getAuthor={getAuthor}
                authorsIsLoading={authorsIsLoading}
            />}
    </AuthorsContext.Consumer>
);