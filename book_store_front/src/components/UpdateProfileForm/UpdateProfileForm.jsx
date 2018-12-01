import React from 'react';

class UpdateAuthorForm extends React.Component {
    constructor(){
        super();
        this.state={
            name:'',
            password:'',
            password_confirmation:'',
            shortPassword:false,
            passwordMatch:true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async componentWillMount(){
        await this.props.getCurrentAuthor();
        this.setState({
            id:this.props.currentAuthor.id,
            name:this.props.currentAuthor.name,
            email:this.props.currentAuthor.email,
            password:'',
            password_confirmation:''
        });
    }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;

        this.setState({
            [name]: val,
            passwordMatch:true,
            shortPassword:false
        });
    }

    handleUpdate(e){
        e.preventDefault();
        if(this.props.checkPasswordMatch(this.state.password, this.state.password_confirmation)){
            this.setState({passwordMatch:false});
            return;
        } else if(this.state.password && this.state.password.length<6){
            this.setState({shortPassword:true});
            return;
        }
        this.props.updateAuthor(this.state);
    }

    render() {
        if(!this.props.authorIsLoading)
            return (
                <form onSubmit={(e) => this.handleUpdate(e,this.state)}>
                    <input type="text" name="name" required placholder='name' value={this.state.name} onChange={this.handleChange}/>
                    <input type="password" name="password"  placholder='password' value={this.state.password} onChange={this.handleChange}/>
                    <input type="password" name="password_confirmation" placholder='confirm password' value={this.state.password_confirmation} onChange={this.handleChange}/>
                    <input type="submit" value="Update" />
                    <button onClick={(e) => this.props.setStateForUpdate(e, -1)}>Cancel</button>
                    <button onClick={(e) => this.props.deleteAuthor()}>Delete Account</button>
                    <label>{this.state.passwordMatch?'':"Password didn't match"}</label>
                    <label>{this.state.shortPassword?"Password is too short, minimum 6 characters":''}</label>
                </form>
            );
        return <h1>Loading...</h1>
    }
}

export default UpdateAuthorForm;
