import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import Auth from './modules/Auth';
import BookList from './components/BookList';
import RegisterForm from './components/RegisterForm';

class App extends Component {
	constructor(){
		super();
		this.state={
			auth: Auth.isAuthorAuthenticated()
		};
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
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
			console.log(resJson);

		} catch (err) {
			console.log(err);
		}


	}
	

	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path='/books' render={()=>
						<BookList/>
					} />
				<Route exact path ='/register' render={()=><RegisterForm handleRegisterSubmit={this.handleRegisterSubmit}/>} />
				</div>
			</Router>
		);
  	}
}

export default App;
