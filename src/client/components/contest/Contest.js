import React, {Component} from 'react'
import {getContest} from '../../services/contestApi'
import getTranslations from '../../utilities/getTranslations'

class Contest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            problems: [],
            status: '',
            table: []
        };
    }

    componentDidMount() {
        getContest(this.props.match.params.contestId)
            .then(({users, problems, status, table}) => {
                this.setState({users, problems, status, table})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    render() {
        const {users, problems, status, table} = this.state;

        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{getTranslations({text: status, format: 'lowercase'})}</div>
                <table>
                    <thead>
                    <tr>
                        <td key={'0'}/>
                        {problems.map((p) => <th key={p.id}>{p.name}</th> )}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) =>
                        <tr key={u.id}>
                            <th key={u.id}>{u.name + ' ' + u.lastName}</th>
                            {
                                problems.map((p) =>
                                    <td key={p.id}>
                                        <span id={p.id}>{table[u.id][p.id].shortening}</span>
                                    </td>
                                )
                            }
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Contest;
