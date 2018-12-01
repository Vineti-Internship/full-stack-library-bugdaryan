import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Api from '../../helpers/Api'

class AuthorList extends Component {
    constructor(){
        super();
        this.state ={
            authors:null
        }
        this.getAuthors = this.getAuthors.bind(this);
    }

    async getAuthors(){
        console.log(this.props)
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
                    <Link to={`/authors/${author.authorId}`}><h2>{author.name}</h2></Link>
                    <h2>{author.username}</h2>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='author-list'>
                {!this.props.authorsIsLoading && this.state.authors? this.renderAuthors():<h1>Loading...</h1>}
            </div>
        );
    }
}

export default AuthorList;
