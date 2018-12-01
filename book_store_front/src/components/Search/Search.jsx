import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/Search.css';
import Spinner from '../../helpers/Spinner';

class Search extends React.Component {
    constructor(){
        super();
        this.state={
            search:''
        }
    }

    async componentDidMount(){
        await this.props.getAllBooks();
        await this.props.getAllAuthors();
        this.setState({
            allBooks:this.props.allBooks,
            allAuthors:this.props.allAuthors,
            search:this.props.search
        });
    }

    updateSearch(e){
        this.setState({search:e.target.value});
    }

    render() {
        if(!this.props.booksIsLoading && this.state.allBooks){
            const filteredBooks = this.state.allBooks.filter(
                (book)=>{
                    return book.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; 
                }
            );
            const filteredAuthors = this.state.allAuthors.filter(
                (author)=>{
                    return author.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; 
                }
            );
            return (
                <div className="search-bar">
                    <input type="text" name="search" maxLength='20' value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                    <h2>books</h2>
                    <div className='filtered-books' style={{border:'2px solid black'}}>
                            {filteredBooks.map((book)=>{
                                return <div key={book.id} className='book'><Link  to={`/books/${book.id}`}><h1>{book.title }</h1> </Link><Link className='book-author' to={`/authors/${book.author.id}`}><h2>Author: {book.author.name}</h2></Link></div>
                            })}
                    </div>
                    <h2>authors</h2>                        
                    <div className='filtered-authors' style={{border:'2px solid black'}}>
                            {filteredAuthors.map((author)=>{
                                return <div key={author.id} className='author'><Link  to={`/authors/${author.id}`}><h1>Name: {author.name}</h1><h2>Username: {author.username}</h2></Link></div>
                            })}
                    </div>
                </div>
            );
        }
        return <Spinner/>;
    }
}

export default Search;
