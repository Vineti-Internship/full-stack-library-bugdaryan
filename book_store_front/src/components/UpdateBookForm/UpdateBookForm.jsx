import React from 'react';

class UpdateBookForm extends React.Component {

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

    updateBook(e){
        e.preventDefault();
        this.props.updateBook(this.state);
        this.props.setStateForUpdate(e, -1);
    }

    render() {
        if(!this.props.booksIsLoading)
            return (
                <form onSubmit={(e) => this.updateBook(e)}>
                    <input type="text" name="title" required={true} placholder='title' value={this.state.title} onChange={this.handleChange}/>
                    <input type="text" name="genre" required={true} placholder='genre' value={this.state.genre} onChange={this.handleChange}/>
                    <textarea type="text" name="description" placholder='description' value={this.state.description} onChange={this.handleChange}/>
                    <input type="submit" value="Update Book" />
                    <button onClick={(e) => this.props.setStateForUpdate(e, -1)}>Cancel</button>
                </form>
            );
        return <h1>Loading...</h1>
    }
}

export default UpdateBookForm;
