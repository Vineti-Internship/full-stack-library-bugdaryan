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
        this.getBook = this.getBook.bind(this);
        this.find = this.find.bind(this);
    }

    state={
        booksIsLoading:false,
        allBooks:[],
        booksLoaded:false,
        authorBooks:[],
        authorBooksLoaded:false,
        currentAuthorBooks:[],
        book:null
    };

    async addBook(book){      
        try {
            this.setState({booksIsLoading:true});
            await Api.post('/books', book, 'book');
            this.setState({booksIsLoading:false});            
            await this.getAllBooks();
        } catch (err) {
            console.log(err)
        }
    }

    async updateBook(book){
        try {
            this.setState({booksIsLoading:true});
            await Api.update(`/books/${book.id}`, book, 'book');
            this.setState({booksIsLoading:false});
            // await this.getAuthorBooks(book.author.id);
        } catch (err) {
            console.log(err);
        }
    }

    async removeBook(e, book){
        e.preventDefault();

        const confirmed = window.confirm(`Do you want to remove ${book.title} book?` );
        if (confirmed){
            this.setState({booksIsLoading:true});
            try {
                await Api.delete(`/books/${book.id}`)
                this.setState({booksIsLoading:false});
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
            this.setState({booksIsLoading:true});
            const res = await Api.get(`/authors/${authorId}`);
            const {books} = await res.json(); 
            this.setState({
                authorBooks:books,
                booksIsLoading:false
            });
        } catch (err){
            console.log(err);
        }
    }

    async getCurrentAuthorBooks(){
        try {
            this.setState({booksIsLoading:true});
            const res = await Api.get('/profile');
            const {books} = await res.json();
            this.setState({
                currentAuthorBooks:books, 
                booksIsLoading:false
            });
        } catch (err) {
            console.log(err)
        }
    }

    async getAllBooks(){
        try {
            this.setState({booksIsLoading:true});
            const res = await Api.get('/books');
            const books = await res.json(); 
            this.setState({
                allBooks:books,
                booksLoaded: true,
                booksIsLoading:false
            });
        } catch (err) {
            console.log(err)
        }
    }

    async getBook(id){
        try {
            this.setState({booksIsLoading:true});
            const res = await Api.get(`/books/${id}`);
            const book = await res.json();
            this.setState({
                book:book,
                booksIsLoading:false
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
                getBook:this.getBook
            }}>
            {this.props.children}
        </BooksContext.Provider>
        )}
}