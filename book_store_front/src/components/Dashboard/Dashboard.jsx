import React, { Component } from 'react';
import '../../styles/Dashboard.css';
import UpdateProfileForm from '../UpdateProfileForm';
import BookList from '../BookList';
import ProfileForm from '../ProfileForm';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            updateProfile:false
        };

        this.setStateForUpdate = this.setStateForUpdate.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }

    async getBooks(){
        await this.props.getCurrentAuthorBooks();
        this.setState({books:this.props.currentAuthorBooks});
    }

    setStateForUpdate(e, updateProfile){
        if(e)
            e.preventDefault();
        this.setState({ updateProfile:updateProfile});
    }

    
    componentDidMount(){
        this.getBooks();
    }

    render() {
            return (
                <div className='dash'>
                    <div className='profile' style={{border:'2px solid black', padding:'4px'}}>
                        {
                        this.state.updateProfile? <UpdateProfileForm setStateForUpdate={this.setStateForUpdate}/> :
                            <ProfileForm setStateForUpdate={this.setStateForUpdate}/>
                        }
                    </div>
                    <BookList books={this.state.books} authorOnHomePage={true} />
                </div>
        );
    }
}

export default Dashboard;
