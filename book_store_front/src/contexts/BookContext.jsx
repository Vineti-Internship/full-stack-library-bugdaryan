import React from 'react';
import Api from '../helpers/Api';

export const BooksContext = React.createContext();

export class BooksProvider extends React.Component {
    constructor(){
        super();
        this.addBook = this.addBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.removeBook = this.removeBook.bind(this);
        this.getAuthorBooks = this.getAuthorBooks.bind(this);
        this.getCurrentAuthorBooks = this.getCurrentAuthorBooks.bind(this);
        this.getAllBooks = this.getAllBooks.bind(this);
        this.getCurrentBook = this.getCurrentBook.bind(this);
        this.find = this.find.bind(this);
    }

    async addBook(book){      
        try {
            this.setState({isLoading:true});
            await Api.post('/books', book, 'book');
            this.setState({isLoading:false});            
            await this.getAllBooks();
        } catch (err) {
            console.log(err)
        }
    }

    async updateBook(book){
        try {
            this.setState({isLoading:true});
            await Api.update(`/books/${book.id}`, book, 'book');
            this.setState({isLoading:false});
            this.getAuthorBooks();
        } catch (err) {
            console.log(err);
        }
    }

    async removeBook(e, book){
        e.preventDefault();

        const confirmed = window.confirm(`Do you want to remove ${book.title} book?` );
        if (confirmed){
            this.setState({isLoading:true});
            try {
                await Api.delete(`/books/${book.id}`)
                this.setState({isLoading:false});
                await this.getAllBooks();
                window.alert("book is successfully deleted, rip");
            } catch (err) {
                console.log(err);
            }
        }else{
            window.alert("woah, that was close!");
        }
    }

    async getAuthorBooks(authorId){
        try{
            this.setState({isLoading:true});
            const res = await Api.get(`/authors/${authorId}`);
            const {books} = await res.json(); 
            this.setState({
                authorBooks:books,
                authorBooksLoaded: true
            });
            this.setState({isLoading:false});
        } catch (err){
            console.log(err);
        }
    }

    async getCurrentAuthorBooks(){
        try {
            this.setState({isLoading:true});
            const res = await Api.get('/profile');
            const {books} = await res.json();
            this.setState({
                currentAuthorBooks:books, 
                isLoading:false
            });
        } catch (err) {
            console.log(err)
        }
    }

    async getAllBooks(){
        try {
            this.setState({isLoading:true});
            const res = await Api.get('/books');
            const books = await res.json(); 
            this.setState({
                allBooks:books,
                booksLoaded: true,
                isLoading:false
            });
        } catch (err) {
            console.log(err)
        }
    }

    async getCurrentBook(id){
        try {
            this.setState({isLoading:true});
            const res = await Api.get(`/books/${id}`);
            const book = await res.json();
            this.setState({
                currentBook:book,
                isLoading:false
            });
        } catch (err) {
            console.log(err);
        }
    }

    find(bookId){
        return (
            this.state.allBooks.slice().filter(
                book=> book.id === parseInt(bookId,10)
            )[0]
        );
    }

    state={
        isLoading:false,
        allBooks:null,
        booksLoaded:false,
        authorBooks:null,
        authorBooksLoaded:false,
        currentAuthorBooks:null,
        currentBook:null
    };

    render(){
        return ( 
        <BooksContext.Provider value={
            {
                ...this.state, 
                addBook:this.addBook, 
                updateBook:this.updateBook, 
                removeBook:this.removeBook, 
                getAuthorBooks:this.getAuthorBooks, 
                getCurrentAuthorBooks:this.getCurrentAuthorBooks, 
                getAllBooks:this.getAllBooks, 
                find:this.find,
                getCurrentBook:this.getCurrentBook
            }}>
            {this.props.children}
        </BooksContext.Provider>
        )}
}