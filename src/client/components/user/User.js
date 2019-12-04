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
            <div className={'wrapper'}>
                <div className={'wrapper__line'}>
                    <label>Name: </label>
                    <span>{name}</span>
                </div>
                <div className={'wrapper__line'}>
                    <label>Last Name: </label>
                    <span>{lastName}</span>
                </div>
                <div className={'wrapper__line'}>
                    <label>Email: </label>
                    <span>{email}</span>
                </div>
                <div className={'wrapper__line'}>
                    <label>Role: </label>
                    <span>{role}</span>
                </div>
            </div>
        )
    }
}

export default connect(null, actions)(User);
