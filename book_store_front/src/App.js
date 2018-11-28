import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import Auth from './modules/Auth';
import BookList from './components/BookList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

class App extends Component {
	constructor(){
		super();
		this.state={
			auth: Auth.isAuthorAuthenticated()
		};
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
	}
	
	async handleRegisterSubmit(e,data){
		e.preventDefault();

		try{
			const res = await fetch('/authors',{
				method: 'POST',
				body: JSON.stringify({
					author: data
				}),
				headers:{
					'Content-Type':'application/json'
				}
			});
			const resJson = await res.json();
			Auth.authenticateToken(resJson.token);
			this.setState({
				auth:Auth.isAuthorAuthenticated()
			});

		} catch (err) {
			console.log(err);
		}
	}

	async handleLoginSubmit(e,data){
		e.preventDefault();
		try {
			const res = await fetch('/login',{
				method:'POST',
				body: JSON.stringify(data),
				headers:{
					'Content-Type':'application/json'
				}
			});
			const resJson = await res.json();
			Auth.authenticateToken(resJson.token);
			this.setState({
				auth:Auth.isAuthorAuthenticated()
			});
			
		} catch (err) {
			console.log(err)
		}

	}
	

	render() {
		return (
			<Router>
				<div className="App">
					<div className='nav'>
						<Link to='/login'>Login</Link>
						<Link to='/register'>Register</Link>
						<Link to='/dash'>Dashboard</Link>
						<Link to='/books'>Books</Link>
					</div>
					<Route exact path='/books' render={()=> <BookList/>} />
					<Route exact path ='/register' render={()=> (this.state.auth)?<Redirect to='/dash' />:<RegisterForm handleRegisterSubmit={this.handleRegisterSubmit}/> } />
					<Route exact path ='/login' render={()=> (this.state.auth)?<Redirect to='/dash' />: <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>} />
					<Route exact path ='/dash' render={()=> <Dashboard />} />
				</div>
			</Router>
		);
  	}
}

export default App;
