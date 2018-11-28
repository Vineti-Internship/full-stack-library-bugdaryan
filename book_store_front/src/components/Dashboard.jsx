import React, { Component } from 'react';
import Auth from '../modules/Auth';
import AddBookForm from './AddBookForm';
import '../styles/Dashboard.css'

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            myBooks:null,
            booksLoaded: false
        };
        this.addBook = this.addBook.bind(this);
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
        this.setState({booksLoaded:false})        
        try {
            await fetch('/books',{
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
            await this.getAuthorBooks();
            this.setState({booksLoaded:true})

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
                    return (
                        <div key={book.id} className='book'>
                            <h1 >{book.title}</h1>
                            <h2>{book.genre}</h2>
                            <p>{book.description}</p>
                            <p>{book.rating}</p>
                            <button style={{float:'right', background:'red', color:'white', padding:'4px', fontSize:'16px'}}>Remove</button>
                        </div>
                    )
                }):<h1>Loading...</h1> }
            </div>
        );
    }
}

export default Dashboard;
