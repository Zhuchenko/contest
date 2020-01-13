import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Popup from './common/Popup'
import {getCoordinators} from '../services/userApi'
import Icon from './common/Icon'
import getTranslations from '../utilities/getTranslations'
import Select from 'react-select'

//TODO: add translations to rights

class SharedRightsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCoordinators: [],
            noRight: [],
            readRights: props.sharedReadRights,
            writeRights: props.sharedWriteRights,
            selectedNoRight: [],
            selectedReadRight: [],
            selectedWriteRight: [],
            isOpened: false
        };
    }

    componentDidMount() {
        getCoordinators().then(this.initializeCoordinators);
    }

    initializeCoordinators = allCoordinators => {
        const {readRights, writeRights} = this.state;
        let noRight = this.removeSelected(allCoordinators, readRights);
        noRight = this.removeSelected(noRight, writeRights);
        this.setState({allCoordinators, noRight});
    };

    removeSelected = (someRights, selected) => {
        return someRights.map(c => {
            for (let i = 0; i < selected.length; i++) {
                if (c.id === selected[i].id) return false;
            }
            return c;
        }).filter(c => !!c);
    };

    concatWithSelected = (someRights, selected) => {
        const {allCoordinators} = this.state;
        let newArr = [...someRights];

        for (let i = 0; i < selected.length; i++) {
            const newR = allCoordinators.find(c => c.id === selected[i].id);
            newArr.push(newR);
        }

        return newArr;
    };

    open = () => {//TODO: coordinators move to list
        this.setState({
            isOpened: true
        });
    };

    close = () => {
        const {allCoordinators} = this.state;
        const {sharedReadRights, sharedWriteRights} = this.props;
        this.setState({
            allCoordinators: [],
            noRight: [],
            readRights: sharedReadRights,
            writeRights: sharedWriteRights,
            selectedNoRight: [],
            selectedReadRight: [],
            selectedWriteRight: [],
            isOpened: false
        });
        this.initializeCoordinators(allCoordinators);
    };

    handleSelectCoordinators = (values) => {
        if (!values || values.length <= 0) {
            this.setState({selectedNoRight: []});
            return;
        }

        const {allCoordinators} = this.state;
        const selectedNoRight = [];
        values.forEach(value => selectedNoRight.push(allCoordinators.find(c => c.id === value.id)));
        this.setState({selectedNoRight});
    };

    handleSelectSharedReadRights = (values) => {
        if (!values || values.length <= 0) {
            this.setState({selectedReadRight: []});
            return;
        }

        const {allCoordinators} = this.state;
        const selectedReadRight = [];
        values.forEach(value => selectedReadRight.push(allCoordinators.find(c => c.id === value.id)));
        this.setState({selectedReadRight});
    };

    handleSelectSharedWriteRights = (values) => {
        if (!values || values.length <= 0) {
            this.setState({selectedWriteRight: []});
            return;
        }

        const {allCoordinators} = this.state;
        const selectedWriteRight = [];
        values.forEach(value => selectedWriteRight.push(allCoordinators.find(c => c.id === value.id)));
        this.setState({selectedWriteRight});
    };

    addReadRight = () => {
        let {noRight, selectedNoRight, readRights} = this.state;
        if (selectedNoRight.length === 0) return;
        readRights = this.concatWithSelected(readRights, selectedNoRight);
        noRight = this.removeSelected(noRight, selectedNoRight);
        this.setState({readRights, noRight, selectedNoRight: []})
    };

    deleteReadRight = () => {
        let {noRight, selectedReadRight, readRights} = this.state;
        if (selectedReadRight.length === 0) return;
        readRights = this.removeSelected(readRights, selectedReadRight);
        noRight = this.concatWithSelected(noRight, selectedReadRight);
        this.setState({readRights, noRight, selectedReadRight: []})
    };

    addWriteRight = () => {
        let {noRight, selectedNoRight, writeRights} = this.state;
        if (selectedNoRight.length === 0) return;
        writeRights = this.concatWithSelected(writeRights, selectedNoRight);
        noRight = this.removeSelected(noRight, selectedNoRight);
        this.setState({writeRights, noRight, selectedNoRight: []})
    };


    deleteWriteRight = () => {
        let {noRight, selectedWriteRight, writeRights} = this.state;
        if (selectedWriteRight.length === 0) return;
        writeRights = this.removeSelected(writeRights, selectedWriteRight);
        noRight = this.concatWithSelected(noRight, selectedWriteRight);
        this.setState({writeRights, noRight, selectedWriteRight: []})
    };

    save = () => {
        const {edit} = this.props;
        let {readRights, writeRights} = this.state;
        readRights = readRights.map(user => (user.id));
        writeRights = writeRights.map(user => (user.id));
        edit({newState: {sharedReadRights: readRights, sharedWriteRights: writeRights}});
    };

    render() {
        const {isOpened, noRight, selectedNoRight, readRights, selectedReadRight, writeRights, selectedWriteRight} = this.state;

        return (
            <>
                <button className={'button button_borderless button_icon'} onClick={this.open}>
                    <Icon type={'share'} className={'icon'}/>
                </button>
                {
                    isOpened &&
                    <Popup>
                        <div className={'dialog'}>
                            <div className={'dialog__line'}>
                                <div className={'dialog__column'}>
                                    <span>{'Read'}</span>
                                    <Select isMulti isSearchable isClearable menuIsOpen value={
                                        selectedReadRight.map(item => ({
                                                id: item.id,
                                                value: item.name,
                                                label: item.name + ' ' + item.lastName
                                            }
                                        ))} options={
                                        readRights.map(item => ({
                                                id: item.id,
                                                value: item.name,
                                                label: item.name + ' ' + item.lastName
                                            }
                                        ))
                                    }
                                            onChange={this.handleSelectSharedReadRights}
                                            className="r-select-container r-select-container--open-menu"
                                            classNamePrefix="r-select"
                                    />
                                </div>
                                <div className={'dialog__column'}>
                                    <button className={'button button_borderless button_icon'}
                                            onClick={this.addReadRight}>{
                                        <Icon type={'move_left'} className={'icon'}/>
                                    }</button>
                                    <button className={'button button_borderless button_icon'}
                                            onClick={this.deleteReadRight}>{
                                        <Icon type={'move_right'} className={'icon'}/>
                                    }</button>
                                </div>
                                <div className={'dialog__column'}>
                                    <span>{'No'}</span>
                                    <Select isMulti isSearchable isClearable menuIsOpen value={
                                        selectedNoRight.map(item => ({
                                                id: item.id,
                                                value: item.name,
                                                label: item.name + ' ' + item.lastName
                                            }
                                        ))} options={
                                        noRight.map(item => ({
                                                id: item.id,
                                                value: item.name,
                                                label: item.name + ' ' + item.lastName
                                            }
                                        ))
                                    }
                                            onChange={this.handleSelectCoordinators}
                                            className="r-select-container r-select-container--open-menu"
                                            classNamePrefix="r-select"
                                    />
                                </div>
                                <div className={'dialog__column'}>
                                    <button className={'button button_borderless button_icon'}
                                            onClick={this.deleteWriteRight}>{
                                        <Icon type={'move_left'} className={'icon'}/>
                                    }</button>
                                    <button className={'button button_borderless button_icon'}
                                            onClick={this.addWriteRight}>{
                                        <Icon type={'move_right'} className={'icon'}/>
                                    }</button>
                                </div>
                                <div className={'dialog__column'}>
                                    <span>{'Write'}</span>
                                    <Select isMulti isSearchable isClearable menuIsOpen value={
                                        selectedWriteRight.map(item => ({
                                                id: item.id,
                                                value: item.name,
                                                label: item.name + ' ' + item.lastName
                                            }
                                        ))} options={
                                        writeRights.map(item => ({
                                                id: item.id,
                                                value: item.name,
                                                label: item.name + ' ' + item.lastName
                                            }
                                        ))
                                    }
                                            onChange={this.handleSelectSharedWriteRights}
                                            className="r-select-container r-select-container--open-menu"
                                            classNamePrefix="r-select"
                                    />
                                </div>
                            </div>
                            <div className={'dialog__button-panel'}>
                                <button className={'button'}
                                        onClick={this.save}>{getTranslations({text: 'save'})}</button>
                                <button className={'button'}
                                        onClick={this.close}>{getTranslations({text: 'cancel'})}</button>
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