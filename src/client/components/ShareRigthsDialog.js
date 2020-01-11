import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Popup from './common/Popup'
import {getCoordinators} from '../services/userApi'
import Icon from './common/Icon'
import getTranslations from '../utilities/getTranslations'
import CustomInput from "./common/CustomInput";

//TODO: add translations to rights
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
                sharedRights = sharedRights.filter(({user}) => (user.id !== coordinators[selectedCoordinator].id))
            }
        }

        this.setState({
            sharedRights: [...sharedRights, {user: coordinators[selectedCoordinator], right: rights[selectedRight]}],
            selectedCoordinator: 0, selectedRight: 0
        });
    };

    delete = ({currentTarget: {id}}) => {
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
                <button className={'button button_borderless button_icon'} onClick={this.open}>
                    <Icon type={'share'} className={'icon'}/>
                </button>
                {
                    isOpened &&
                    <Popup>
                        <div className={'dialog'}>
                            <div className={'dialog__line dialog__line__list'}>
                                {
                                    sharedRights.length > 0 &&
                                    sharedRights.map((item, id) => <div key={id}>
                                        <span>{item.user.lastName + ' ' + item.user.name + ' - ' + item.right}</span>
                                        <button className={'button button_borderless button_icon'} id={'right_' + id}
                                                onClick={this.delete}>
                                            <Icon type={'delete'} className={'icon'}/>
                                        </button>
                                    </div>)
                                }
                            </div>
                            <div className={'dialog__line'}>
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
                                <button className={'button button_borderless button_icon'} onClick={this.add}>
                                    <Icon type={'add'} className={'icon'}/>
                                </button>
                            </div>
                            <div className={'dialog__button-panel'}>
                                <button className={'button'} onClick={this.save}>{getTranslations({text: 'save'})}</button>
                                <button className={'button'} onClick={this.close}>{getTranslations({text: 'cancel'})}</button>
                            </div>
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