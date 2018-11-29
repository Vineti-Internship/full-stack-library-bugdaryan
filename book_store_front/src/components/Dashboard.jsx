import React, { Component } from 'react';
import AddBookForm from './AddBookForm';
import '../styles/Dashboard.css'
import Api from '../store/modules/Api'
import UpdateBookForm from './UpdateBookForm';

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
        this.handleUpdateBook = this.handleUpdateBook.bind(this);
        this.setUpdateBookId = this.setUpdateBookId.bind(this);
    }
    
    async getAuthorBooks(){
        try{
            const res = await Api.get('/profile')
            const author = await res.json();
            this.setState({
                author: author,
                myBooks: author.books,
                updateBookId: -1,
                booksLoaded: true
            });
        }catch (err){
            console.log(err);
        }
    }

    async addBook(e,data){
        this.setState({booksLoaded:false})        
        try {
            await Api.post('/books', data, 'book');
            await this.getAuthorBooks();
        } catch (err) {
            console.log(err)
        }
    }
    
    async removeBook(e, book){
        e.preventDefault();

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

    async handleUpdateBook(e, data){
        e.preventDefault();
        try {   
            await Api.update(`/books/${data.id}`, data, 'book');
            this.setUpdateBookId(null, -1);
            this.getAuthorBooks();
        } catch (err) {
            console.log(err);
        }
    }


    setUpdateBookId(e, bookId){
        if(e)
            e.preventDefault();

        this.setState({updateBookId:bookId});
    }
    
    componentDidMount(){
        this.getAuthorBooks();
    }

    render() {
        if(this.state.booksLoaded)
            return (
                <div className='dash'>
                    <div className='profile-info' style={{border:'2px solid black', padding:'4px'}}>
                        <h1>Profile</h1>
                        <h1>Name:{this.state.author.name}</h1>
                        <h2>username:{this.state.author.username}</h2>
                        <h3>username:{this.state.author.email}</h3>
                    </div>

                    <AddBookForm addBook={this.addBook}/>
                    {(this.state.myBooks && this.state.booksLoaded)? this.state.myBooks.map(book => {
                        if(book.id === this.state.updateBookId)
                            return (<UpdateBookForm key={book.id} book = {book} handleUpdateBook={this.handleUpdateBook} setUpdateBookId={this.setUpdateBookId}/>)
                        else 
                            return (
                                <div key={book.id} className='book'>
                                    <h1 >{book.title}</h1>
                                    <h2>{book.genre}</h2>
                                    <p>{book.description}</p>
                                    <p>{book.rating}</p>
                                    <button onClick={(e) => this.removeBook(e, book)} style={{ background:'red', color:'white', padding:'4px', fontSize:'16px', marginRight:'4px'}}>Remove</button>
                                    <button onClick={(e) => this.setUpdateBookId(e, book.id)} style={{ background:'rgb(64, 239, 76)', color:'black', padding:'4px', fontSize:'16px'}}>Update</button>
                                </div>
                            )
                    }):<h1>Loading...</h1> }
                </div>
        );
        return <h1>Loading...</h1>;
    }
}

export default Dashboard;
