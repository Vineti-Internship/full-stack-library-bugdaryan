import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            email:'',
            name:''
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;

        this.setState({
            [name]: val 
        })
    }

    render() {
        return (
            <div className='form'>
                <form onSubmit={(e)=> this.props.handleRegisterSubmit(e,this.state)}>
                    <input type='text' placeholder='username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <input type='password' placeholder='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <input type='email' placeholder='email' name='email' value={this.state.email} onChange={this.handleChange}/>
                    <input type='text' placeholder='name' name='name' value={this.state.name} onChange={this.handleChange}/>
                    <input type="submit" value='Register'/>
                </form>
            </div>
        );
    }
}


export default RegisterForm;
