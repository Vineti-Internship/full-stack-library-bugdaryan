import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            password_confirmation:'',
            email:'',
            name:'',
            passwordsMatch:true,
            registerFailed:false,
            passwordTooShort:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault()
        if(!this.props.checkPasswordMatch(this.state.password, this.state.password_confirmation)){
            this.setState({password:'',  password_confirmation:'', passwordsMatch:false});
            return;
        }
        if(!this.props.checkPasswordLength(this.state.password)){
            this.setState({password:'',  password_confirmation:'', passwordTooShort:true});
            return;
        }
        const res = await this.props.register(this.state);
        this.setState({registerFailed:(!res), password:'', password_confirmation:''});
        this.props.checkAuthorAuthentication();
    }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;

        this.setState({
            [name]: val,
            passwordsMatch:true,
            registerFailed:false,
            passwordTooShort:false
        })
    }

    render() {
        return (
            <div className='form'>
                <form onSubmit={(e)=> this.handleSubmit(e,this.state)}>
                    <label style={{color:'white'}}> Name: </label>
                    <input required type='text' placeholder='name' name='name' value={this.state.name} onChange={this.handleChange}/>
                    <label style={{color:'white'}}> Username: </label>
                    <input required type='text' placeholder='username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <label style={{color:'white'}}> Email: </label>
                    <input required type='email' placeholder='email' name='email' value={this.state.email} onChange={this.handleChange}/>
                    <label style={{color:'white'}}> Password: </label>
                    <input required type='password' placeholder='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <label style={{color:'white'}}> Confirm Password: </label>
                    <input required type='password' placeholder='confirm password' name='password_confirmation' value={this.state.password_confirmation} onChange={this.handleChange}/>
                    <input type="submit" value='Register'/>
                </form>
                <label>{this.state.passwordsMatch?'':"Password didn't match"}</label>
                <label>{this.state.registerFailed?"Invalid input":''}</label>
                <label>{this.state.passwordTooShort?"Password is too short":''}</label>
            </div>
        );
    }
}


export default RegisterForm;
