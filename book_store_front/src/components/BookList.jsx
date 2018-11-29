import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Api from '../store/modules/Api'

class BookList extends Component {
    constructor(){
        super();
        this.state ={
            bookList:null,
            bookListLoaded:false
        }
    }

    async getBooks(){
        try{
            const res = await Api.get('/books');
            const books = await res.json(); 
            this.setState({
                bookList:books,
                bookListLoaded: true
            });
        } catch (err){
            console.log(err);
        }
    }

    componentDidMount(){
        this.getBooks();
    }

    renderBooks(){
        return this.state.bookList.map(book => {
            return (
                <div className="book" key={book.id}>
                    <Link to={`/books/${book.id}`}><h2>{book.title}</h2></Link>
                    <h2 style={{float:'right'}}>{book.author.username}</h2>
                    <h3>{book.genre}</h3>
                    <p>{book.description}</p>
                    <p>{book.rating}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='book-list'>
                {this.state.bookListLoaded? this.renderBooks():<h1>Loading...</h1>}
            </div>
        );
    }
}

export default BookList;
