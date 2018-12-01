import LoginForm from './LoginForm';
import {AuthorsContext} from '../../contexts/AuthorsContext';
import React from 'react';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({login, checkPasswordLength, authorsIsLoading}) => 
            <LoginForm 
                {...props}
                authorsIsLoading={authorsIsLoading}
                checkPasswordLength={checkPasswordLength}
                login={login}
            />}
    </AuthorsContext.Consumer>
);