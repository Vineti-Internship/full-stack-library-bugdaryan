import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import UpdateBookForm from '../UpdateBookForm';

class BookList extends Component {
    state={
        updateBookId:-1,
        books:null
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

    componentDidMount(){
        this.getBooks();
    }

    renderBooks(){
        return this.state.books.map(book => {
            return (
                book.id===this.state.updateBookId? <UpdateBookForm book={book} setUpdateBookId={this.setUpdateBookId} /> :this.renderBook(book)
            );
        })
    }
    
    render() {
        return (
            <div className='book-list'>
                {this.props.isLoading || !this.state.books ?<h1>Loading...</h1>:this.renderBooks()}
            </div>
        );
    }
}

export default BookList;
