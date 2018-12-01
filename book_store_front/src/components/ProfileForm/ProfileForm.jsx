
import React from 'react';

class ProfileForm extends React.Component {
    constructor(){
        super();
        this.state={
            author:null
        }

        this.getAuthor = this.getAuthor.bind(this);
    }


    async getAuthor(){
        await this.props.getCurrentAuthor();
        
        this.setState({author:this.props.currentAuthor});
    }

    componentDidMount(){
        this.getAuthor();
    }

    render() {
        // console.log(this.state)
        if(!this.props.authorsIsLoading && this.state.author)
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

                            