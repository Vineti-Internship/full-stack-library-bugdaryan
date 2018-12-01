import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import UpdateBookForm from '../UpdateBookForm';
import AddBookForm from '../AddBookForm';

class BookList extends Component {
    constructor(){
        super();

        this.state={
            updateBookId:-1
        }

        this.setUpdateBookId = this.setUpdateBookId.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.renderBook = this.renderBook.bind(this);
        this.renderBooks = this.renderBooks.bind(this);
    }

    // state={
    //     updateBookId:-1
    // }

    async removeBook(e, book){
        await this.props.removeBook(e, book);
        await this.getBooks();
    }

    setUpdateBookId(e, id){
        if(e)
            e.preventDefault();
        this.setState({updateBookId:id});
    }

    async getBooks(){
        if(this.props.authorOnHomePage){
            await this.props.getCurrentAuthorBooks();
            this.setState({books:this.props.currentAuthorBooks});
        } else if(this.props.authorId){
            await this.props.getAuthorBooks(this.props.authorId);
            this.setState({books:this.props.authorBooks});
        } else{
            await this.props.getAllBooks();
            this.setState({books:this.props.allBooks});
        }
    }

    renderBook(book){
        return (
            <div className="book" key={book.id}>
                {this.props.authorOnHomePage? <h2>{book.title}</h2>:<Link to={`/books/${book.id}`}><h2>{book.title}</h2></Link>}
                <h2 style={{float:'right'}}>{this.props.authorId?'':book.author.name}</h2>
                <h3>{book.genre}</h3>
                {!this.props.authorOnHomePage && !this.props.authorId && <h3 style={{float:'right'}}>{book.authorName}</h3>}
                <p>{book.description}</p>
                <p>{book.rating}</p>
                {this.props.authorOnHomePage && <button onClick={(e) => this.removeBook(e, book)} style={{ background:'red', color:'white', padding:'4px', fontSize:'16px', marginRight:'4px'}}>Remove</button>}
                {this.props.authorOnHomePage && <button onClick={(e) => this.setUpdateBookId(e, book.id)} style={{ background:'rgb(64, 239, 76)', color:'black', padding:'4px', fontSize:'16px'}}>Update</button>}
            </div>
        );
    }

    renderBooks(){
        
        return ( 
            this.state.books.map(book => {
            return (
                book.id===this.state.updateBookId? 
                    <UpdateBookForm book={book} setUpdateBookId={this.setUpdateBookId} /> 
                    :this.renderBook(book)
            );
        }))
    }

    componentDidMount(){
        this.getBooks();
    }

    
    render() {
        return (
            <div className='book-list'>
            {this.props.authorOnHomePage && <AddBookForm getBooks={this.getBooks}/>}
                {!this.props.booksIsLoading && this.state.books?
                    this.renderBooks()
                    :<h1>Loading...</h1>}
            </div>
        );
    }
}

export default BookList;
