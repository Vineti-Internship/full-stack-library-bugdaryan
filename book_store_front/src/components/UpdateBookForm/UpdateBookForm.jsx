import React from 'react';

class UpdateBookForm extends React.Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    componentWillMount(){
        this.setState({
            id:this.props.book.id,
            title:this.props.book.title,
            genre:this.props.book.genre,
            description:this.props.book.description
        });
    }

    handleChange(e){
        e.preventDefault();
        
        const name = e.target.name;
        const val = e.target.value;

        this.setState({
            [name]: val 
        });
    }

    async updateBook(e){
        e.preventDefault();
        await this.props.updateBook(this.state);
        this.props.setUpdateBookId(e, -1);
        await this.props.getBooks();
    }

    render() {
        if(!this.props.booksIsLoading)
            return (
                <form onSubmit={(e) => this.updateBook(e)}>
                    <input type="text" name="title" required={true} placholder='title' value={this.state.title} onChange={this.handleChange}/>
                    <input type="text" name="genre" required={true} placholder='genre' value={this.state.genre} onChange={this.handleChange}/>
                    <textarea type="text" name="description" placholder='description' value={this.state.description} onChange={this.handleChange}/>
                    <input type="submit" value="Update Book" />
                    <button onClick={(e) => this.props.setUpdateBookId(e, -1)}>Cancel</button>
                </form>
            );
        return <h1>Loading...</h1>
    }
}

export default UpdateBookForm;
