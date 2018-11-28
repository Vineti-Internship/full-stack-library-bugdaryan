import React, { Component } from 'react';
import Auth from '../modules/Auth';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            myBooks:null,
            booksLoaded: false
        };
    }

    async componentDidMount(){
        try{
            const res = await fetch('/profile',{
                method:'GET',
                headers:{
                    token:Auth.getToken(),
                    'Authorization': `Token ${Auth.getToken()}`
                }
            })
            const resJson = await res.json();
            this.setState({
                myBooks: resJson.books,
                booksLoaded: true
            });
        }catch (err){
            console.log(err);
        }
    }

    render() {
        return (
            <div className='dash'>
                {(this.state.booksLoaded)? this.state.myBooks.map(book => {
                    return <h1 key={book.id}>{book.title}</h1>
                }):<h1>Loading...</h1> }
            </div>
        );
    }
}

export default Dashboard;
