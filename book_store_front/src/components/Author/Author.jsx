import React from 'react';
import BookList from '../BookList'

class Author extends React.Component  {
    constructor(){
        super();
        this.state={
            author:null
        };
    }

    async componentDidMount(){
        await this.props.getAuthor(this.props.match.params.authorId);
        this.setState({author:this.props.author});
    }

render(){
    if(this.state.author && !this.props.authorsIsLoading)
        return (
            <div className='author'>
                <h1>Author: {this.state.author.name}</h1>
                <h2>Email: {this.state.author.email}</h2>
                <h2>Username: {this.state.author.username}</h2>
                Books
                <BookList authorId={this.state.author.id} />
            </div>
        );
    else
        return <h1>Loading...</h1>
    }
}

export default Author;
