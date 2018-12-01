import React, { Component } from 'react';
import AddBookForm from '../AddBookForm';
import '../../styles/Dashboard.css';
import Api from '../../helpers/Api';
import UpdateBookForm from '../UpdateBookForm';
import UpdateProfileForm from '../UpdateProfileForm';
import BookList from '../BookList';
import ProfileForm from '../ProfileForm';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            updateProfile:false
        };

        this.setStateForUpdate = this.setStateForUpdate.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }

    getBooks(){
        this.props.getCurrentAuthorBooks();
        this.setState({books:this.props.currentAuthorBooks});
    }

    setStateForUpdate(e, bookId, updateProfile){
        if(e)
            e.preventDefault();
        if(updateProfile)
            this.setState({updateBookId:bookId, updateProfile:true});
        this.setState({updateBookId:bookId, updateProfile:true});
    }

    
    componentDidMount(){
        this.getBooks();
    }

    render() {
        console.log(this.props)
        if(!this.props.booksIsLoading)
            return (
                <div className='dash'>
                    <div className='profile' style={{border:'2px solid black', padding:'4px'}}>
                        {
                        this.state.updateProfile? <UpdateProfileForm setStateForUpdate={this.setStateForUpdate}/> :
                            <ProfileForm setStateForUpdate={this.setStateForUpdate}/>
                        }
                    </div>
                    <AddBookForm />
                    {(this.state.books && !this.props.booksIsLoading && !this.props.authorsIsLoading)? 
                    this.state.myBooks.map(book => {
                        if(book.id === this.state.updateBookId)
                            return (<UpdateBookForm key={book.id} book={book}  setStateForUpdate={this.setStateForUpdate} />)
                        else 
                            return (
                                <BookList authorOnHomePage={true}/>
                            )
                    }):<h1>Loading...</h1>}
                </div>
        );
        return <h1>Loading...</h1>;
    }
}

export default Dashboard;
