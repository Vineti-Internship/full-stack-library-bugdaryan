import React, { Component } from 'react';
import Auth from '../store/modules/Auth';
import AddBookForm from './AddBookForm';
import '../styles/Dashboard.css'
import Api from '../store/modules/Api'

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            myBooks:null,
            booksLoaded: false
        };
        this.addBook = this.addBook.bind(this);
        this.getAuthorBooks = this.getAuthorBooks.bind(this);
        this.removeBook = this.removeBook.bind(this);
    }
    
    async getAuthorBooks(){
        try{
            const res = await Api.get('/profile')
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
            await Api.post('/books',data,'book');
            await this.getAuthorBooks();
        } catch (err) {
            console.log(err)
        }
    }
    
    async removeBook(book){
        const confirmed = window.confirm(`Do you want to remove ${book.title} book?` );
        if (confirmed){
            this.setState({booksLoaded:false});
            try {
                await Api.delete(`/books/${book.id}`)
                await this.getAuthorBooks();
                // window.alert("book is successfully deleted, rip");
            } catch (err) {
                console.log(err);
            }
            
        }else{
            window.alert("woah, that was close!");
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
                            <button onClick={() => this.removeBook(book)} style={{ background:'red', color:'white', padding:'4px', fontSize:'16px', marginRight:'4px'}}>Remove</button>
                            <button onClick={(e) => this.updateBook(e, book)} style={{ background:'rgb(64, 239, 76)', color:'black', padding:'4px', fontSize:'16px'}}>Update</button>
                        </div>
                    )
                }):<h1>Loading...</h1> }
            </div>
        );
    }
}

export default Dashboard;
