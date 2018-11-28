import React, { Component } from 'react';

class BookList extends Component {
    constructor(){
        super();
        this.state ={
            bookList:null,
            bookListLoaded:false
        }
    }

    async componentDidMount(){
        try{
            const res = await fetch('/books');
            const resJson = await res.json(); 
            this.setState({
                bookList:resJson.books,
                bookListLoaded: true
            });
        } catch (e){
            console.log(e);
        }
    }

    renderBooks(){
        return this.state.bookList.map(book => {
            return (
                <div className="book" key={book.id}>
                    <h2>{book.title}</h2>
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
