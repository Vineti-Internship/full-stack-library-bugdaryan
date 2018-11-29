import React from 'react';

class UpdateBookForm extends React.Component {
    constructor(){
        super();
        this.state={
            title:'',
            genre:'',
            description:''
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
            <form onSubmit={(e) => this.props.updateBook(e,this.state)}>
                <input type="text" name="title" required={true} placholder='title' value={this.state.title} onChange={this.handleChange}/>
                <input type="text" name="genre" required={true} placholder='genre' value={this.state.genre} onChange={this.handleChange}/>
                <input type="text" name="description" placholder='description' value={this.state.description} onChange={this.handleChange}/>
                <input type="submit" value="Update Book" />
            </form>
        );
    }
}

export default UpdateBookForm;
