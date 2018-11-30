import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(){
        super();
        this.state ={
            username: '',
            password:'',
            loginFailed:false
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
            loginFailed:false
        });
    }

    async handleSubmit(e){
        e.preventDefault();
        const res = await this.props.handleLoginSubmit(e,this.state);
        this.setState({loginFailed:(!res)});
        this.setState({password:''});
    }

    render() {
        return (
            <div className='form'>
                <form onSubmit={(e)=> this.handleSubmit(e)}>
                    <input type='text' required placeholder='username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <input type='password' required placeholder='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <input type="submit" value='Login'/>
                </form>
                <label>{this.state.loginFailed?'Incorrect username or password':''}</label>
            </div>
        );
    }
}

export default LoginForm;
