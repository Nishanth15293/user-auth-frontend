import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import ImageInput from './ImageInput'
import SerializeForm from 'form-serialize';
import * as UsersAPI from '../utils/UsersAPI';


class LoginForm extends Component {

    state ={
        handleSubmit : ((e)=>{
            e.preventDefault();
            const values = SerializeForm(e.target, {hash: true});
            // if(this.props.onCreateUser)
                this.userLogin(values)
        })
    }

    userLogin = (user) => {
        UsersAPI.login(user).then(res => {
            var self = this;
            self.setState(state =>({
                user: res.user
            }))
            localStorage.setItem('current_user', JSON.stringify(res.user));
            localStorage.setItem('token', res.token);
            self.props.onLogin();
            self.props.history.history.push('/users');
        })
    }

    render(){
        return(
            <div>
                {/* <form onSubmit={this.state.handleSubmit} className="create-user-form">
                    <ImageInput 
                        className="create-user-avatar-input"
                        name="avatarURL"
                        maxHeight={64}
                    />
                    <div className="create-user-details">
                        <input type="text" name="name" placeholder="Name"/>
                        <input type="text" name="email" placeholder="Email"/>
                        <button>Add User</button>
                    </div>
                </form> */}
                <form onSubmit={this.state.handleSubmit} className="form-signin">
                    <h2 className="form-signin-heading">Please Login IN</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" required/>
                    <label htmlFor="inputPassword" className="sr-only" >Password</label>
                    <input type="password" id="inputPassword" name="password" className="form-control"  placeholder="Password" required/>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login Me In!</button>
                    <br />
                    <p className="text-muted pull-right">Not registered yet? <br />
                        <Link className="pull-right" to="/register" > Create a new Account</Link>
                    </p>

                </form>

            </div>
        )
    }
}

export default LoginForm