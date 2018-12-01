
import React, { Component } from 'react';

class ProfileForm extends Component {
    state={
        author:null
    }

    async componentDidMount(){
        await this.props.getCurrentAuthor();
        this.setState({author:this.props.currentAuthor});
    }

    render() {
        console.log(this.state)
        if(!this.props.isLoading && this.state.author)
            return (
                <div className='profile-info'>
                    <h1>Profile</h1>
                    <h1>Name: {this.state.author.name}</h1>
                    <h2>username: {this.state.author.username}</h2>
                    <h3>email: {this.state.author.email}</h3>
                    <button onClick={(e)=> this.props.setStateForUpdate(e,-1,true)}>Edit Profile</button>
                </div>
            );
        return <h1>Loading...</h1>
    }
}

export default ProfileForm;

                            