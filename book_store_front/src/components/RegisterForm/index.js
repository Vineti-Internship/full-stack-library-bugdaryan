import RegisterForm from './RegisterForm';
import {AuthorsContext} from '../../contexts/AuthorsContext';
import React from 'react';

export default (props)=> (
    <AuthorsContext.Consumer>
        {({register, checkPasswordLength, checkPasswordMatch, authorsIsLoading}) => 
            <RegisterForm 
                {...props}
                authorsIsLoading={authorsIsLoading}
                checkPasswordLength={checkPasswordLength}
                checkPasswordMatch={checkPasswordMatch}
                register={register}
            />}
    </AuthorsContext.Consumer>
);