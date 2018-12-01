import AuthorList from './AuthorList';
import {AuthorsContext} from '../../contexts/AuthorsContext';
import React from 'react';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({allAuthors, getAllAuthors, authorsIsLoading}) => 
            <AuthorList 
                {...props} 
                allAuthors={allAuthors} 
                getAllAuthors={getAllAuthors}
                authorsIsLoading={authorsIsLoading}
            />}
    </AuthorsContext.Consumer>
);