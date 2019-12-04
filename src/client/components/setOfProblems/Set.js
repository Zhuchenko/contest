import React, {Component} from 'react'
import {getSet} from '../../services/setOfProblemsApi'
import getList from "../common/List";
import {Link} from "react-router-dom";

const ProblemInSet = (problem) => <Link to={'/problems/' + problem.id}>{problem.name}</Link>;

class Set extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            problems: []
        }
    }

    componentDidMount() {
        getSet(this.props.match.params.setId)
            .then(set => {
                const {name, problems} = set;
                this.setState({name, problems})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    render() {
        const {name, problems} = this.state;
        const List = getList(ProblemInSet, problems);
        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{name}</div>
                <div className={'wrapper__line'}>
                    <label>{"Number of problems: " + problems.length}</label>
                </div>
                <div className={'wrapper__line wrapper__line__list'}>
                    <label>List of problems: </label>
                    <List/>
                </div>
            </div>
        )
    }
}

export default Set;
