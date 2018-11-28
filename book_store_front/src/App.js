import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import Auth from './modules/Auth'
import BookList from './components/BookList'


class App extends Component {
	constructor(){
		super();
		this.state={
			auth: Auth.isAuthorAuthenticated(),

		}
  	}

	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path='/books' render={()=>
						<BookList/>
					} />
				</div>
			</Router>
		);
  	}
}

export default App;
