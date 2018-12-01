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
        if(this.props.checkPasswordLength(this.state.password)){
            this.setState({loginFailed:true});
            this.setState({password:''});
        }
        if (await this.props.login(this.state))
            this.props.checkAuthorAuthentication();
        else
            this.setState({loginFailed:true,password:''});
    }

    render() {
        return (
            <div className='form'>
                <form onSubmit={(e)=> this.handleSubmit(e)}>
                    <label style={{color:'white'}}> Username: </label>
                    <input type='text' required placeholder='username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <label style={{color:'white'}}> Password: </label>
                    <input type='password' required placeholder='password' name='password' style={{marginRight:'6px'}} value={this.state.password} onChange={this.handleChange}/>
                    <input type="submit" value='Login'/>
                </form>
                <label>{this.state.loginFailed?'Incorrect username or password':''}</label>
            </div>
        );
    }
}

export default LoginForm;
