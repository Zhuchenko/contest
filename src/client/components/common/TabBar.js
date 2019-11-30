import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getClassNames from "../../utilities/getClassnames";

import './css/tabBar.css'

class TabBar extends Component {
    handleClick = (event) => {
        const id = event.target.id;
        this.props.handleChanged(id);
    };

    render() {
        const {tabs, selectedId} = this.props;

        return (
            <div className={'tab-bar'}>
                {tabs.map((currentTab) => {
                    const isSelected = (selectedId === currentTab.id);
                    const classes = getClassNames({['tab']: true, ['tab--selected']: isSelected});

                    return <button
                        id={currentTab.id}
                        key={currentTab.id}
                        className={classes}
                        onClick={this.handleClick}>
                        {currentTab.text}
                    </button>
                })}
            </div>
        )
    }
}

TabBar.propTypes = {
    handleChanged: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired,
    selectedId: PropTypes.string.isRequired
};

export default TabBar