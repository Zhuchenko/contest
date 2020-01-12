import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import getClassNames from '../../utilities/getClassnames'
import getTranslations from '../../utilities/getTranslations'

import './css/navPanel.css'

const linkPathsById = {
    0: '/problems/',
    1: '/sets/',
    2: '/groups/',
    3: '/contests/',
    4: '/users/'
};

class NavigationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedId: -1};
    }

    handleChanged = (tab) => {
        this.setState({selectedId: tab});
    };

    handleClick = (event) => {
        const id = event.target.id;
        this.handleChanged(id);
    };

    getLinkClassName = (id) => {
        const {selectedId} = this.state;
        return getClassNames({
            ['nav-panel__link']: true,
            ['nav-panel__link_selected']: parseInt(selectedId) === parseInt(id) || window.location.pathname === linkPathsById[id]
        });
    };

    render() {
        const {isAuthorized, canAddUser, canAddProblems, canAddSet} = this.props;

        return (isAuthorized ? (<div className={'nav-panel'}>
                {canAddProblems ? <Link id={0} className={this.getLinkClassName(0)} to={linkPathsById[0]} onClick={this.handleClick}>{getTranslations({text: 'problems'})}</Link> : null}
                {canAddSet ? <Link id={1} className={this.getLinkClassName(1)} to={linkPathsById[1]} onClick={this.handleClick}>{getTranslations({text: 'sets'})}</Link> : null}
                <Link id={2} className={this.getLinkClassName(2)} to={linkPathsById[2]} onClick={this.handleClick}>{getTranslations({text: 'groups'})}</Link>
                <Link id={3} className={this.getLinkClassName(3)} to={linkPathsById[3]} onClick={this.handleClick}>{getTranslations({text: 'contests'})}</Link>
                {canAddUser ? <Link id={4} className={this.getLinkClassName(4)} to={linkPathsById[4]} onClick={this.handleClick}>{getTranslations({text: 'users'})}</Link> : null}
            </div>) : null

        )
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.application.authorized,
    canAddUser: state.application.authorized ? state.application.rights.user.edit : null,
    canAddProblems:  state.application.authorized ? state.application.rights.problem.add : null,
    canAddSet:  state.application.authorized ? state.application.rights.setOfProblems.add : null,
});

export default connect(mapStateToProps)(NavigationPanel);