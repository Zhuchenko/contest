import React, {Component} from 'react'
import {getUser} from '../../services/userApi'
import * as actions from '../../redux/application/actions'
import {connect} from 'react-redux'
import getTranslations from '../../utilities/getTranslations'

const ROLES = ['participant', 'coordinator', 'administrator'];

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            roleIndex: 0,
        }
    }

    componentDidMount() {
        getUser(this.props.match.params.userId)
            .then(user => {
                const {name, lastName, email, role} = user;
                const roleIndex = ROLES.findIndex(r => r === role);
                this.setState({name, lastName, email, roleIndex})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        })
    }

    render() {
        const {name, lastName, email, roleIndex} = this.state;

        return (
            <div className={'wrapper'}>
                <div className={'wrapper__line'}>
                    <label>{getTranslations({text: 'name'})}:&nbsp;</label>
                    <span>{name}</span>
                </div>
                <div className={'wrapper__line'}>
                    <label>{getTranslations({text: 'last name'})}:&nbsp;</label>
                    <span>{lastName}</span>
                </div>
                <div className={'wrapper__line'}>
                    <label>Email:&nbsp;</label>
                    <span>{email}</span>
                </div>
                <div className={'wrapper__line'}>
                    <label>{getTranslations({text: 'role'})}:&nbsp;</label>
                    <span>{ROLES[roleIndex]}</span>
                </div>
            </div>
        )
    }
}

export default connect(null, actions)(User);
