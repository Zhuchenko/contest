import React, {Component} from 'react'
import {getUser} from '../../services/userApi'
import * as actions from '../../redux/application/actions'
import {connect} from "react-redux";


//import './css/user.css';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            roleIndex: '',
        }
    }

    componentDidMount() {
        getUser(this.props.match.params.userId)
            .then(user => {
                const {name, lastName, email, role} = user;
                this.setState({name, lastName, email, roleIndex: role === 'participant' ? 0 : 1})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        })
    }

    render() {
        const {name, lastName, email, role} = this.state;
        return (
            <div className={'user'}>
                <span>Name: </span>
                <span>{name}</span>
                <br/>
                <span>Last Name: </span>
                <span>{lastName}</span>
                <br/>
                <span>email: </span>
                <span>{email}</span>
                <br/>
                <span>Role: </span>
                <span>{role}</span>
            </div>
        )
    }
}

export default connect(null, actions)(User);
