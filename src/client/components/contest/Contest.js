import React, {Component} from 'react'
import {getContestTableView} from '../../services/contestApi'
import getTranslations from '../../utilities/getTranslations'
import {Link} from 'react-router-dom'

import './css/contest-overview.css'

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
        getContestTableView(this.props.match.params.contestId)
            .then(({users, problems, status, table}) => {
                this.setState({users, problems, status, table})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    render() {
        const {users, problems, status, table} = this.state;
        const {contestId} = this.props.match.params;

        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{getTranslations({text: status, format: 'lowercase'})}</div>
                <div className={'contest-overview scrollbar'}>
                    <table>
                        <thead>
                        <tr>
                            <td key={'0'}/>
                            {problems.map((p) => <th key={p.id}>
                                <Link to={contestId + '/problems/' + p.id}>
                                    {p.name}
                                </Link>
                            </th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((u) =>
                            <tr key={u.id}>
                                <th key={u.id}>{u.name + ' ' + u.lastName}</th>
                                {
                                    problems.map((p) =>
                                        <td key={p.id}>
                                            <span id={p.id}
                                                  title={table[u.id][p.id].shortening !== '-' ? (
                                                      getTranslations({text: 'time'}) + ': ' + Math.round(table[u.id][p.id].time.$numberDecimal) + '\r\n'
                                                      + getTranslations({text: 'memory'}) + ': ' + Math.round(table[u.id][p.id].memory.$numberDecimal))
                                                      : ''}>
                                                {table[u.id][p.id].shortening}
                                            </span>
                                        </td>
                                    )
                                }
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Contest;
