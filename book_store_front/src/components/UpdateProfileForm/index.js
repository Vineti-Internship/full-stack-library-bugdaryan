import UpdateProfileForm from './UpdateProfileForm';
import {AuthorsContext} from '../../contexts/AuthorsContext';
import React from 'react';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({
            currentAuthor, 
            updateAuthor, 
            deleteAuthor, 
            authorsIsLoading
          }) => 
            <UpdateProfileForm 
                {...props}
                currentAuthor={currentAuthor}
                updateAuthor={updateAuthor}
                deleteAuthor={deleteAuthor}
                authorsIsLoading={authorsIsLoading}
            />}
    </AuthorsContext.Consumer>
);