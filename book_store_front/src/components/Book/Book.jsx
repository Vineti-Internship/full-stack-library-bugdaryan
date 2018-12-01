import React from 'react';
import {Link} from 'react-router-dom'


class Book extends React.Component  {
state={
    book:null
    };

    async componentDidMount(){
        await this.props.getBook(this.props.match.params.bookId);
        this.setState({book:this.props.book});
    }

render(){
    if(!this.props.booksIsLoading && this.state.book)
        return (
            <div className='book'>
                <h1>Title:{this.state.book.title}</h1>
                <h2>Genre:{this.state.book.genre}</h2>
                Description
                <p>{this.state.book.description}</p>
                <p>Rating:{this.state.book.rating}</p>
                Author:<Link to={`/authors/${this.state.book.author.id}`}>{this.state.book.author.name}</Link>
            </div>
        );
    else
        return <h1>Loading...</h1>
    }
}

export default Book;
