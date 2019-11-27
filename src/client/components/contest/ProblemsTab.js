import React, {Component} from 'react'
import {getProblems} from '../../services/contestApi'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class ProblemsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: []
        }
    }

    componentDidMount() {
        getProblems(this.props.contestId)
            .then(problems => {
                this.setState({problems})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    render() {
        const {problems} = this.state;
        const {contestId} = this.props;
        return (problems.map(({id, name}) => <Link to={'/contests/' + contestId + '/problems/' + id}>{name}</Link>));
    }
}

ProblemsTab.propTypes = {
    contestId: PropTypes.string.isRequired,
};

export default ProblemsTab;
