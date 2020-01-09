import React, {Component} from 'react'
import {getGroup} from '../../services/groupOfUsersApi'
import getList from "../common/List";
import {Link} from "react-router-dom";
import getTranslations from '../../utilities/getTranslations'

//import './css/user.css';

const UserInGroup = (user) => <Link to={'/users/' + user.id}>{user.lastName + ' ' + user.name}</Link>;

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users: []
        }
    }

    componentDidMount() {
        getGroup(this.props.match.params.groupId)
            .then(group => {
                const {name, users} = group;
                this.setState({name, users})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    render() {
        const {name, users} = this.state;
        const List = getList(UserInGroup, users);
        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{name}</div>
                <div className={'wrapper__line'}>
                    <label>{getTranslations({text: 'number of participants'}) + ": " + users.length}</label>
                </div>
                <div className={'wrapper__line wrapper__line__list'}>
                    <label>{getTranslations({text: 'list of participants'})}: </label>
                    <List/>
                </div>
            </div>
        )
    }
}

export default Group;
