import UpdateProfileForm from './UpdateProfileForm';
import {AuthorsContext} from '../../contexts/AuthorsContext';
import React from 'react';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({
            getCurrentAuthor,
            currentAuthor,
            updateAuthor, 
            deleteAuthor, 
            authorsIsLoading,
            checkPasswordMatch,
            checkPasswordLength,
          }) => 
            <UpdateProfileForm 
                {...props}
                checkPasswordLength={checkPasswordLength}
                checkPasswordMatch={checkPasswordMatch}
                getCurrentAuthor={getCurrentAuthor}
                currentAuthor={currentAuthor}
                updateAuthor={updateAuthor}
                deleteAuthor={deleteAuthor}
                authorsIsLoading={authorsIsLoading}
            />}
    </AuthorsContext.Consumer>
);