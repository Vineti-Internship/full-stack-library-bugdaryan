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

    componentWillMount(){
        this.setState({
            id:this.props.book.id,
            title:this.props.book.title,
            genre:this.props.book.genre,
            description:this.props.book.description
        });
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
            <form onSubmit={(e) => this.props.handleUpdateBook(e,this.state)}>
                <input type="text" name="title" required={true} placholder='title' value={this.state.title} onChange={this.handleChange}/>
                <input type="text" name="genre" required={true} placholder='genre' value={this.state.genre} onChange={this.handleChange}/>
                <input type="text" name="description" placholder='description' value={this.state.description} onChange={this.handleChange}/>
                <input type="submit" value="Update Book" />
                <button onClick={(e) => this.props.setUpdateBookId(e, -1)}>Cancel</button>
            </form>
        );
    }
}

export default UpdateBookForm;
