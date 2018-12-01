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
import Api from './helpers/Api';

class App extends Component {
	constructor(){
		super();
		this.state={
			auth: Auth.isAuthorAuthenticated(),
			author:null
		};
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	async handleLogout(){
		try {
			await Api.delete('/logout');
			Auth.deauthenticateToken();
			this.setState({
				auth:Auth.isAuthorAuthenticated()
			});
		} catch (err) {
			console.log(err)
		}
	}
	
	async handleRegisterSubmit(e,data){
		e.preventDefault();

		try{
			const res = await Api.post('/authors',data,'author')
			const resJson = await res.json();
			if (res.ok){
				Auth.authenticateToken(resJson.token);
				this.setState({
					auth:Auth.isAuthorAuthenticated()
				});
				return true;
			}else{
				console.log(res)
				return false;
			}

		} catch (err) {
			console.log(err);
		}
	}

	async handleLoginSubmit(e,data){
		e.preventDefault();
		try {
			const res = await Api.post('/login' ,data);
			const resJson = await res.json();
			if(res.ok){
				Auth.authenticateToken(resJson.token);
				this.setState({
					auth:Auth.isAuthorAuthenticated()
				});
				return true;
			} else{
				return false;
			}
			
		} catch (err) {
			console.log(err)
		}

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
					<Route exact path = '/dash' render={()=> (this.state.auth)?<Dashboard author={this.author} handleLogout={this.handleLogout}/>: <Redirect to='/books' /> } />
					<Route exact path = '/books' render={()=> <BookList/>} />
					<Route exact path = '/books/:bookId' component={Book} />
					<Route exact path = '/authors' render={()=> <AuthorList/>} />
					<Route exact path = '/authors/:authorId' component={Author} />
					<Route exact path = '/register' render={()=> (this.state.auth)?<Redirect to='/dash' />: <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit}/> } />
					<Route exact path = '/login' render={()=> (this.state.auth)?<Redirect to='/dash' />: <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>} />
					<Route exact path = '/' render={()=>  <Redirect to='/books' />} />
				</div>
			</Router>
		);
  	}
}

export default App;
