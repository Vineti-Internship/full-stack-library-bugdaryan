import React, { Component } from 'react';
import Auth from '../modules/Auth';

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

    render() {
        return (
            <div className='form'>
                <form onSubmit={(e) => this.props.addBook(e,this.state)}>
                    <input type="text" name="title" placholder='title' value={this.state.title} onChange={this.handleChange}/>
                    <input type="text" name="genre" placholder='genre' value={this.state.genre} onChange={this.handleChange}/>
                    <input type="text" name="description" placholder='description' value={this.state.description} onChange={this.handleChange}/>
                    <input type="text" name="rating" placholder='rating' value={this.state.rating} onChange={this.handleChange}/>
                    <input type="submit" value="Add Monster" />
                </form>
            </div>
        );
    }
}

export default AddBookForm;
