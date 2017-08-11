import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import SerializeForm from 'form-serialize'
import * as UsersAPI from './utils/UsersAPI';


class RegisterUser extends Component {

    state ={
        handleSubmit : ((e)=>{
            e.preventDefault();
            const values = SerializeForm(e.target, {hash: true});
            // if(this.props.onCreateUser)
                this.createUser(values)
        })
    }

    createUser = (user) => {
        var self = this;
        UsersAPI.create(user).then(res => {
            self.setState(state =>({
                user: res.user
            }))
            self.props.history.history.push('/');
        })
    }

    render(){
        return(
            <div>
                {/* <form onSubmit={this.state.handleSubmit} className="create-user-form">
                    <div className="create-user-details">
                        <input type="text" name="name" placeholder="Name"/>
                        <input type="text" name="email" placeholder="Email"/>
                        <input type="text" name="phone" placeholder="Phone"/>
                        <button>Add User</button>
                    </div>
                </form> */}


                <form onSubmit={this.state.handleSubmit} className="form-signin">
                    <h2 className="form-signin-heading ">Sign Up!</h2>
                     {/* <ImageInput 
                        className="create-user-avatar-input"
                        name="avatarURL"
                        maxHeight={64}
                    />  */}
                    <label htmlFor="inputName" className="sr-only" >Name</label>
                    <input type="text" id="inputName" className="form-control" name="name" placeholder="Name" required />
                    <label htmlFor="inputEmail" className="sr-only" >Email address</label>
                    <input type="email" id="inputEmail" className="form-control" name="email" placeholder="Email address" required />
                    <input type="phone" id="inputPhone" className="form-control" name="phone" placeholder="Phone" required />
                    <label htmlFor="inputPassword" className="sr-only" >Password</label>
                    <input type="password" id="inputPassword" className="form-control" name="password" placeholder="Password" required/>
                    <input type="password" id="confirmPassword" className="form-control" name="confirm-password"placeholder="Confirm Password" required/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                    <br />
                    <p className="pull-right">Already Registered? <Link to="/">Login here!</Link></p>
                </form>

            </div>
        )
    }
}

export default RegisterUser