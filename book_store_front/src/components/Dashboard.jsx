import React, { Component } from 'react';
import Auth from '../modules/Auth';
import AddBookForm from './AddBookForm';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            myBooks:null,
            booksLoaded: false
        };
    }
    
    async getAuthorBooks(){
        try{
            const res = await fetch('/profile',{
                method:'GET',
                headers:{
                    token:Auth.getToken(),
                    'Authorization': `Token ${Auth.getToken()}`
                }
            })
            const resJson = await res.json();
            this.setState({
                myBooks: resJson.books,
                booksLoaded: true
            });
        }catch (err){
            console.log(err);
        }
    }

    async addBook(e,data){
        try {
            const res = await fetch('/books',{
               method:'POST',
               headers: {
                    'Content-Type': 'application/json',
                    token:Auth.getToken(),
                    'Authorization': `Token ${Auth.getToken()}`
               },
               body:JSON.stringify({
                    book: data
               })
            });
            const resJson = await res.json();
            console.log(resJson);
            await this.getAuthorBooks();
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount(){
        this.getAuthorBooks();
    }

    render() {
        return (
            <div className='dash'>
                <AddBookForm addBook={this.addBook}/>
                {(this.state.booksLoaded)? this.state.myBooks.map(book => {
                    return <h1 key={book.id}>{book.title}</h1>
                }):<h1>Loading...</h1> }
            </div>
        );
    }
}

export default Dashboard;
