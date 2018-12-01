import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BooksProvider} from './contexts/BooksContext';
import {AuthorsProvider, AuthorsContext} from './contexts/AuthorsContext';

ReactDOM.render(
    <AuthorsProvider>
        <BooksProvider>
            <AuthorsContext.Consumer>
                {
                ({logout})=>
                    <App logout={logout}/>
                }
            </AuthorsContext.Consumer>
        </BooksProvider>
    </AuthorsProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
