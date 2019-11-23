import React, {Component} from 'react'
import {getParticipants} from '../../services/contestApi'
import getList from "../common/List";
import {Link} from "react-router-dom";

const GroupInContest = (group) => <Link to={'/groups/' + group.id}>{group.name}</Link>;
const UserInGroup = (user) => <Link to={'/users/' + user.id}>{user.lastName + ' ' + user.name}</Link>;

class ParticipantsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        }
    }

    componentDidMount() {
        getParticipants(this.props.match.params.contestId)
            .then(groups => {
                this.setState({groups})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    render() {
        const {groups} = this.state;

        return (
            <>
                {
                    groups.map(({id, name, users}) => (<>
                        <GroupInContest {...{id, name}}/>
                        {
                            users.map((user) => <UserInGroup {...user}/>)
                        }
                    </>))
                }
            </>
        )
    }
}

export default Contest;
