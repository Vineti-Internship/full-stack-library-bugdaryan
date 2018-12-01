import React from 'react';
import {Link} from 'react-router-dom';

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
            // let filteredAuthors = 
            return (
                <div className="search-bar">
                    <input type="text" name="search" maxLength='20' value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                    <div className='filtered-books' style={{border:'2px solid black'}}>
                        <h2>books</h2>
                        <ul>
                            {filteredBooks.map((book)=>{
                                return <Link key={book.id} to={`/books/${book.id}`}><h1>{book.title }</h1></Link>
                            })}
                        </ul>
                    </div>
                    <div className='filtered-authors' style={{border:'2px solid black'}}>
                    <h2>authors</h2>                        
                        <ul>
                            {filteredAuthors.map((author)=>{
                                return <Link key={author.id} to={`/authors/${author.id}`}><h1>{author.name}</h1></Link>
                            })}
                        </ul>
                    </div>
                </div>
            );
        }
        return <h1>Loading...</h1>
    }
}

export default Search;
