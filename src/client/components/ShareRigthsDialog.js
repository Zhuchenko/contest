import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Popup from './common/Popup'
import {getCoordinators} from '../services/userApi'
import Icon from "./common/Icon";

const rights = ["read", "write"];

const getIndex = (key) => key.substring(key.indexOf("_") + 1);

class SharedRightsDialog extends Component {
    constructor(props) {
        super(props);
        const sharedReadRights = props.sharedReadRights.map(item => ({user: item, right: "read"}));
        const sharedWriteRights = props.sharedWriteRights.map(item => ({user: item, right: "write"}));
        this.state = {
            isOpened: false,
            coordinators: [],
            sharedRights: [...sharedReadRights, ...sharedWriteRights],
            selectedCoordinator: 0,
            selectedRight: 0,
        };
    }

    componentDidMount() {
        getCoordinators()
            .then(coordinators => {
                this.setState({coordinators});
            })
    }

    add = () => {
        let {sharedRights, selectedCoordinator, selectedRight, coordinators} = this.state;
        const coordinator = sharedRights.find(({user}) => user.id === coordinators[selectedCoordinator].id);
        if (coordinator) {
            if (rights[selectedRight] === coordinator.right || rights[selectedRight] === "read") {
                return;
            }
            if (rights[selectedRight] === "write") {
                sharedRights = sharedRights.filter(({user}) => user.id === selectedCoordinator);
            }
        }

        this.setState({
            sharedRights: [...sharedRights, {user: coordinators[selectedCoordinator], right: rights[selectedRight]}],
            selectedCoordinator: 0, selectedRight: 0
        });
    };

    delete = ({target: {id}}) => {
        const {sharedRights} = this.state;
        sharedRights.splice(getIndex(id), 1);
        this.setState({sharedRights});
    };

    open = () => {//TODO: coordinators move to list
        const sharedReadRights = this.props.sharedReadRights.map(item => ({user: item, right: "read"}));
        const sharedWriteRights = this.props.sharedWriteRights.map(item => ({user: item, right: "write"}));
        this.setState({
            isOpened: true,
            sharedRights: [...sharedReadRights, ...sharedWriteRights],
            selectedCoordinator: 0,
            selectedRight: 0,
        });
    };

    close = () => {
        this.setState({isOpened: false});
    };

    handleCoordinatorChanged = (e) => {
        const selectedCoordinator = e.target.selectedIndex;
        this.setState({selectedCoordinator});
    };

    handleRightChanged = (e) => {
        const selectedRight = e.target.selectedIndex;
        this.setState({selectedRight});
    };

    save = () => {
        const {edit} = this.props;
        const {sharedRights} = this.state;
        const sharedReadRights = sharedRights.filter(item => item.right === "read").map(item => (item.user.id));
        const sharedWriteRights = sharedRights.filter(item => item.right === "write").map(item => (item.user.id));
        edit({newState: {sharedReadRights, sharedWriteRights}});
    };

    render() {
        const {isOpened, sharedRights, coordinators, selectedCoordinator, selectedRight} = this.state;

        return (
            <>
                <button onClick={this.open}>share</button>
                {
                    isOpened &&
                    <Popup>
                        <div>
                            {
                                sharedRights.length > 0 &&
                                sharedRights.map((item, id) => <div key={id}>
                                    <span>{item.user.lastName + ' ' + item.user.name + ' - ' + item.right}</span>
                                    <button key={'right_' + id} onClick={this.delete}>
                                        <Icon type={'close'} className={'icon'}/>
                                    </button>
                                </div>)
                            }
                            <select onChange={this.handleCoordinatorChanged} value={selectedCoordinator}>
                                {
                                    coordinators.map((user, i) => (
                                        <option key={i} value={i} label={user.lastName + ' ' + user.name}/>
                                    ))
                                }
                            </select>
                            <select onChange={this.handleRightChanged} value={selectedRight}>
                                {
                                    rights.map((right, i) => (
                                        <option key={i} value={i} label={right}/>
                                    ))
                                }
                            </select>
                            <button onClick={this.add}>
                                <Icon type={'add'} className={'icon'}/>
                            </button>
                            <button onClick={this.close}>Cancel</button>
                            <button onClick={this.save}>Save</button>
                        </div>
                    </Popup>
                }
            </>
        )
    }
}

SharedRightsDialog.propTypes = {
    sharedReadRights: PropTypes.array.isRequired,
    sharedWriteRights: PropTypes.array.isRequired,
    edit: PropTypes.func.isRequired
};

export default SharedRightsDialog