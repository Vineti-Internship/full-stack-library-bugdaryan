import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../../helpers/Spinner';

class AuthorList extends Component {
    constructor(){
        super();
        this.state ={
            authors:null
        }
        this.getAuthors = this.getAuthors.bind(this);
    }

    async getAuthors(){
        await this.props.getAllAuthors();
        this.setState({authors:this.props.allAuthors});
    }

    componentDidMount(){
        this.getAuthors();
    }

    renderAuthors(){
        return this.state.authors.map(author => {
            return (
                <div className="author" key={author.id}>
                    <Link to={`/authors/${author.id}`}><h2>Name: {author.name}</h2></Link>
                    <h2>Username: {author.username}</h2>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='author-list'>
                {!this.props.authorsIsLoading && this.state.authors? this.renderAuthors():<Spinner />}
            </div>
        );
    }
}

export default AuthorList;
