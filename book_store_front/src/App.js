import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import Auth from './Auth/Auth';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Book from './components/Book';
import Author from './components/Author';

class App extends Component {
	constructor(){
		super();
		this.state={
			auth: Auth.isAuthorAuthenticated()
		};
		this.checkAuthorAuthentication = this.checkAuthorAuthentication.bind(this);
	}

	checkAuthorAuthentication(){
		this.setState({auth:Auth.authenticateToken});
	}

	render() {
		return (
			<Router>
				<div className="App">
					<div className='nav'>
						{(this.state.auth)? <Link to='/dash' style={{marginRight:'8px'}}>Dashboard</Link>:''}
						<Link to='/books' style={{marginRight:'8px'}}>Books</Link>
						<Link to='/authors' style={{marginRight:'8px'}}>Authors</Link>
						{(this.state.auth)? '':<Link to='/login' style={{marginRight:'8px'}}>Login</Link>}
						{(this.state.auth)? '':<Link to='/register' style={{marginRight:'8px'}}>Register</Link>}
						{(this.state.auth)? <button onClick={this.handleLogout} style={{float:'right'}}>Logout</button>:''}
					</div>
					<Route exact path = '/dash' render={()=> (this.state.auth)?<Dashboard checkAuthorAuthentication={this.checkAuthorAuthentication}/>: <Redirect to='/books' /> } />
					<Route exact path = '/books' render={()=> <BookList/>} />
					<Route exact path = '/books/:bookId' component={Book} />
					<Route exact path = '/authors' render={()=> <AuthorList/>} />
					<Route exact path = '/authors/:authorId' component={Author} />
					<Route exact path = '/register' render={()=> (this.state.auth)?<Redirect to='/dash' />: <RegisterForm checkAuthorAuthentication={this.checkAuthorAuthentication}/> } />
					<Route exact path = '/login' render={()=> (this.state.auth)?<Redirect to='/dash' />: <LoginForm checkAuthorAuthentication={this.checkAuthorAuthentication}/>} />
					<Route exact path = '/' render={()=>  <Redirect to='/books' />} />
				</div>
			</Router>
		);
  	}
}

export default App;
