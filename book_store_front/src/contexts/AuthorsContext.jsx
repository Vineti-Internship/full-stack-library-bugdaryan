import React from 'react';
import Auth from '../Auth/Auth';
import Api from '../helpers/Api';

export const AuthorsContext = React.createContext();

export class AuthorsProvider extends React.Component{
    constructor(){
        super();

        
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
        this.getAuthor = this.getAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.getAllAuthors = this.getAllAuthors.bind(this);
        this.getCurrentAuthor = this.getCurrentAuthor.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
        this.checkPasswordLength = this.checkPasswordLength.bind(this);
    }
    state={
        authorsIsLoading:false,
        allAuthors:[],
        currentAuthor:null,
        author:null
    }

    checkPasswordLength(password){
        if(password.length < 6)
            return false;
        return true;
    }

    checkPasswordMatch(password, password_confirmation){
        return password === password_confirmation;
    }
    
    async getAllAuthors(){
        try{
            this.setState({authorsIsLoading:true});
            const res = await Api.get('/authors');
            const authors = await res.json(); 
            this.setState({
                allAuthors:authors,
                authorsIsLoading:false
            });
        } catch (err){
            console.log(err);
        }
    }

    async login(data){
        try {
            this.setState({authorsIsLoading:true});
			const res = await Api.post('/login' ,data);
            const resJson = await res.json();
            this.setState({authorsIsLoading:false});
			if(res.ok){
				Auth.authenticateToken(resJson.token);
				return true;
			} else{
				return false;
			}
		} catch (err) {
			console.log(err)
		}
    }

    async logout(){
        try {
            this.setState({authorsIsLoading:true});
			await Api.delete('/logout');
            Auth.deauthenticateToken();
            this.setState({authorsIsLoading:false});
		} catch (err) {
			console.log(err)
		}
    }

    async register(data){
        try{
            this.setState({authorsIsLoading:true});
			const res = await Api.post('/authors',data,'author')
			const resJson = await res.json();
            this.setState({authorsIsLoading:false});
			if (res.ok){
				Auth.authenticateToken(resJson.token);
				return true;
			} else{
				return false;
            }
		} catch (err) {
			console.log(err);
		}
    }

    async getAuthor(authorId){
        try{
            this.setState({authorsIsLoading:true});
            const res = await fetch(`/authors/${authorId}`);
            const author = await res.json(); 
            this.setState({
                author:author,
                authorsIsLoading:false
            });
        } catch (err){
            console.log(err);
        }
    }

    async deleteAuthor(){
        try {
            this.setState({authorsIsLoading:true});
            await Api.delete(`/authors/${this.state.author.authorId}`);
            this.setState({authorsIsLoading:false});
            this.logout();
        } catch (err) {
            console.log(err);
        }
    }

    async updateAuthor(author){
        try {
            this.setState({authorsIsLoading:true});
            await Api.update(`/authors/${author.authorId}`, author, 'author');
            this.setState({authorsIsLoading:false});            
        } catch (err) {
            console.log(err);
        }
    }

    async getCurrentAuthor(){
        try {
            this.setState({authorsIsLoading:true});
            const res = await Api.get('/profile');
            const author = await res.json();
            this.setState({
                currentAuthor:author, 
                authorsIsLoading:false
            });
        } catch (err) {
            console.log(err)
        }
    }


    render(){
        return (
        <AuthorsContext.Provider value={
            {
                ...this.state,
                login:this.login,
                logout:this.logout,
                register:this.register,
                getAuthor:this.getAuthor,
                getAllAuthors:this.getAllAuthors,
                deleteAuthor:this.deleteAuthor,
                updateAuthor:this.updateAuthor,
                getCurrentAuthor:this.getCurrentAuthor,
                checkPasswordMatch:this.checkPasswordMatch,
                checkPasswordLength:this.checkPasswordLength
            }
        }>
            {this.props.children}
        </AuthorsContext.Provider>
    )}
}