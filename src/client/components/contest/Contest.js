import React, {Component} from 'react'
import {getContest} from '../../services/contestApi'
import getList from "../common/List";
import {Link} from "react-router-dom";

const UserInGroup = (user) => <Link to={'/users/' + user.id}>{user.lastName + ' ' + user.name}</Link>;

class Contest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            groups: [],
            problems:[]
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
            <div>
                <h3>{name}</h3>
                <span>{"Number of participants: " + users.length}</span>
                <List/>
            </div>
        )
    }
}

export default Contest;
