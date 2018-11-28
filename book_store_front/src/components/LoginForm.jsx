import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(){
        super();
        this.state ={
            username: '',
            password:'',
        };
        this.handleChange=this.handleChange.bind(this);
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
                <form onSubmit={(e)=> this.props.handleLoginSubmit(e,this.state)}>
                    <input type='text' placeholder='username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <input type='password' placeholder='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <input type="submit" value='Login'/>
                </form>
            </div>
        );
    }
}

export default LoginForm;
