import ProfileForm from './ProfileForm';
import {AuthorsContext} from '../../contexts/AuthorsContext';
import React from 'react';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({currentAuthor, getCurrentAuthor, authorsIsLoading}) => 
            <ProfileForm 
                {...props}
                authorsIsLoading={authorsIsLoading}
                getCurrentAuthor={getCurrentAuthor}
                currentAuthor={currentAuthor}
            />}
    </AuthorsContext.Consumer>
);