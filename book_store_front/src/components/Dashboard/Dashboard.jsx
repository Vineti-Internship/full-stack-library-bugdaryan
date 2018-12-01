import React, { Component } from 'react';
import AddBookForm from '../AddBookForm';
import '../../styles/Dashboard.css';
import Api from '../../helpers/Api';
import UpdateBookForm from '../UpdateBookForm';
import UpdateProfileForm from '../UpdateProfileForm';
import BookList from '../BookList';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            updateProfile:false
        };

        this.setStateForUpdate = this.setStateForUpdate.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
        this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
        this.updateBooks = this.updateBooks.bind(this);
    }

    async handleUpdateProfile(e, author){
        e.preventDefault();
        try {
            const res = await Api.update(`/authors/${author.id}`, author, 'author');
            if(await res.ok){
                this.setState({updateProfile:false});
                this.props.getAuthorBooks();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async handleDeleteProfile(e){
        e.preventDefault();
        try {
            await Api.delete(`/authors/${this.state.author.id}`);
            this.props.handleLogout();
        } catch (err) {
            console.log(err);
        }

    }

    updateBooks(){
        this.props.getCurrentAuthorBooks();
        this.setState({books:this.props.currentAuthorBooks});
    }

    setStateForUpdate(e, bookId){
        if(e)
            e.preventDefault();

        this.setState({updateBookId:bookId, updateProfile:false});
    }

    
    componentDidMount(){
        this.updateBooks();
    }

    render() {
        console.log(this.props)
        if(!this.props.isLoading)
            return (
                <div className='dash'>
                    <div className='profile' style={{border:'2px solid black', padding:'4px'}}>
                        {
                        this.state.updateProfile? <UpdateProfileForm author={this.state.author} setStateForUpdate={this.setStateForUpdate} handleDeleteProfile={this.handleDeleteProfile} handleUpdateProfile={this.handleUpdateProfile}/> :
                            <div className='profile-info'>
                                <h1>Profile</h1>
                                <h1>Name: {this.state.author.name}</h1>
                                <h2>username: {this.state.author.username}</h2>
                                <h3>email: {this.state.author.email}</h3>
                                <button onClick={(e)=> this.setState({updateProfile:true})}>Edit Profile</button>
                            </div>
                        }
                    </div>
                    <AddBookForm />
                    {(this.state.myBooks && this.state.booksLoaded)? this.state.myBooks.map(book => {
                        if(book.id === this.state.updateBookId)
                            return (<UpdateBookForm key={book.id} book = {book} handleUpdateBook={this.handleUpdateBook} setStateForUpdate={this.setStateForUpdate}/>)
                        else 
                            return (
                                <BookList authorOnHomePage={true}/>
                            )
                    }):<div></div>}
                </div>
        );
        return <h1>Loading...</h1>;
    }
}

export default Dashboard;
