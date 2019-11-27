import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import './css/navPanel.css'
import getClassNames from "../../utilities/getClassnames";

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
        var selectedId = this.state.selectedId;
        return getClassNames({['nav-panel__link']: true, ['nav-panel__link_selected']: parseInt(selectedId) === parseInt(id)});
    };

    render() {
        const {isAuthorized, canAddUser, canAddProblems, canAddSet} = this.props;

        return (isAuthorized ? (<div className={'nav-panel'}>
                {canAddProblems ? <Link id={0} className={this.getLinkClassName(0)} to={'/problems/'} onClick={this.handleClick}>{'Problems'}</Link> : null}
                {canAddSet ? <Link id={1} className={this.getLinkClassName(1)} to={'/sets/'} onClick={this.handleClick}>{'Sets'}</Link> : null}
                <Link id={2} className={this.getLinkClassName(2)} to={'/groups/'} onClick={this.handleClick}>{'Groups'}</Link>
                <Link id={3} className={this.getLinkClassName(3)} to={'/contests/'} onClick={this.handleClick}>{'Contests'}</Link>
                {canAddUser ? <Link id={4} className={this.getLinkClassName(4)} to={'/users/'} onClick={this.handleClick}>{'Users'}</Link> : null}
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