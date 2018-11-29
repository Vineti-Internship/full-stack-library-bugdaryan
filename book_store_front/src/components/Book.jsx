import React from 'react';
import Auth from '../store/modules/Auth'

class Book extends React.Component  {
    constructor(){
        super();
        this.state={
            book:null,
            bookLoaded: false,
            auth: Auth.isAuthorAuthenticated
        };
    }

    async componentDidMount(){
        try{
            const res = await fetch(`/books/${this.props.match.params.bookId}`);
            const resJson = await res.json(); 
            this.setState({
                book:resJson.book,
                author:resJson.author,
                bookLoaded: true,
                auth:Auth.isAuthorAuthenticated
            });
        } catch (err){
            console.log(err);
        }
    }

render(){
    if(this.state.bookLoaded)
        return (
            <div className='book'>
                <h1>Title:{this.state.book.title}</h1>
                <h2>Genre:{this.state.book.genre}</h2>
                Description
                <p>{this.state.book.description}</p>
                <p>Rating:{this.state.book.rating}</p>
                <p>Author: {this.state.author.username}</p>
            </div>
        );
    else
        return <h1>Loading...</h1>
    }
}

export default Book;
