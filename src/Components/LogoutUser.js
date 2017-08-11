import React, {Component} from 'react'


class LogoutUser extends Component {
    constructor(){
        super();
        debugger;
        // localStorage.removeItem('token');
        delete(localStorage.token);
        delete(localStorage.current_user);
    }

    componentWillMount(){
        this.props.onLogout();
        debugger;
    }

    render(){
        return(
            <div>
               Loggin Out
            </div>
        );
    }
}

export default LogoutUser