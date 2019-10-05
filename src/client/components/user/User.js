import React, {Component} from 'react'
import {getUser} from '../../services/userApi'

//import './css/user.css';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        getUser(this.props.match.params.userId)
            .then(user => {
                this.setState({
                    user: user
                })
            })
    }

    render() {
        const {user} = this.state;
        console.log(user)
        return (
            <div className={'user'}>
                {
                    JSON.stringify(user)
                }
            </div>
        )
    }
}

export default User
