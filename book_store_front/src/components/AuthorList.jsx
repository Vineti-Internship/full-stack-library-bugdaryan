import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/Api'

class AuthorList extends Component {
    constructor(){
        super();
        this.state ={
            authorList:null,
            authorListLoaded:false
        }
    }

    async getAuthors(){
        try{
            const res = await Api.get('/authors');
            const authors = await res.json(); 
            this.setState({
                authorList:authors,
                authorListLoaded: true
            });
        } catch (err){
            console.log(err);
        }
    }

    componentDidMount(){
        this.getAuthors();
    }

    renderauthors(){
        return this.state.authorList.map(author => {
            return (
                <div className="author" key={author.id}>
                    <Link to={`/authors/${author.id}`}><h2>{author.name}</h2></Link>
                    <h2>{author.username}</h2>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='author-list'>
                {this.state.authorListLoaded? this.renderauthors():<h1>Loading...</h1>}
            </div>
        );
    }
}

export default AuthorList;
