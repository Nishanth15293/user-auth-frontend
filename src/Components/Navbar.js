import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import * as UsersAPI from '../utils/UsersAPI';


class Navbar extends Component {
    constructor(){
        super()
    }
    state = {
        isAuthenticated: UsersAPI.isAuthenticated()
    }

    logoutClicked = (e)=>{
        localStorage.removeItem('token');
        delete(localStorage.token);
        delete(localStorage.current_user);
        this.setState({isAuthenticated: UsersAPI.isAuthenticated()});
        this.props.history.history.push("/");
    }

    render(){
        return(
            
            <div className= "navbar">
                <ul className="nav nav-tabs pull-right">
                    {(!this.state.isAuthenticated && <li role="presentation" ><NavLink activeClassName="selected" exact to="/" >Login</NavLink></li>)}
                    {(!this.state.isAuthenticated && <li role="presentation"><NavLink activeClassName="selected" exact to="/register">Sign Up</NavLink></li>)}
                    {(this.state.isAuthenticated && <li role="presentation"><a className="cursor-btn" onClick={this.logoutClicked}>Logout</a></li>)}
                </ul>
            </div>

        );
    }

}

export default Navbar