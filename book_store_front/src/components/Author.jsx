import React from 'react';
import BookList from './BookList'

class Author extends React.Component  {
    constructor(){
        super();
        this.state={
            author:null,
            authorLoaded: false
        };
    }

    async componentDidMount(){
        try{
            const res = await fetch(`/authors/${this.props.match.params.authorId}`);
            const author = await res.json(); 
            this.setState({
                author:author,
                authorLoaded: true
            });
        } catch (err){
            console.log(err);
        }
    }

render(){
    if(this.state.authorLoaded)
        return (
            <div className='author'>
                <h1>Title:{this.state.author.name}</h1>
                <h2>Genre:{this.state.author.email}</h2>
                <h2>{this.state.author.username}</h2>
                Books
                <BookList authorId={this.state.author.id} />
            </div>
        );
    else
        return <h1>Loading...</h1>
    }
}

export default Author;
