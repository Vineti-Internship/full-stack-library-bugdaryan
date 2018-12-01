import React, { Component } from 'react';

class AddBookForm extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            genre:'',
            description:'',
            rating:''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;

        this.setState({
            [name]: val 
        });
    }

    async addBook(e){
        e.preventDefault();
        
        await this.props.addBook(this.state);
        await this.props.getBooks();
        this.setState({
            title:'',
            genre:'',
            description:''
        })
    }

    render() {
        return (
            <div className='AddBookForm'>
                <form onSubmit={(e) => this.addBook(e)}>
                    <label style={{color:'white'}}> Book Title: </label>
                    <input type="text" name="title" required={true} placholder='title' value={this.state.title} onChange={this.handleChange}/>
                    <label style={{color:'white'}}> Book Genre: </label>                    
                    <input type="text" name="genre" required={true} placholder='genre' value={this.state.genre} onChange={this.handleChange}/>
                    <label style={{color:'white'}}> Description: </label>                    
                    <textarea type="text" name="description" placholder='description' value={this.state.description} onChange={this.handleChange}/>
                    <input type="submit" value="Add Book" />
                </form>
            </div>
        );
    }
}

export default AddBookForm;
