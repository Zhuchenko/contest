import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Popup from './common/Popup'
import {getCoordinators} from '../services/userApi'
import Icon from './common/Icon'
import getTranslations from '../utilities/getTranslations'

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
        getCoordinators()
            .then(allCoordinators => {
                const {readRights, writeRights} = this.state;
                let noRight = this.removeSelected(allCoordinators, readRights.map(rr => rr.id));
                noRight = this.removeSelected(noRight, writeRights.map(wr => wr.id));
                this.setState({allCoordinators, noRight});
            })
    }

    removeSelected = (someRights, selected) => {
        return someRights.map(c => {
            for (let i = 0; i < selected.length; i++) {
                if (c.id === selected[i]) return false;
            }
            return c;
        }).filter(c => !!c);
    };

    concatWithSelected = (someRights, selected) => {
        const {allCoordinators} = this.state;
        let newArr = [...someRights];

        for (let i = 0; i < selected.length; i++) {
            const newR = allCoordinators.find(c => c.id === selected[i]);
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
        this.setState({isOpened: false});
    };

    handleSelectCoordinators = ({target: {options}}) => {
        let selectedNoRight = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedNoRight.push(options[i].value);
            }
        }
        this.setState({selectedNoRight});
    };

    handleSelectSharedReadRights = ({target: {options}}) => {
        let selectedReadRight = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedReadRight.push(options[i].value);
            }
        }
        this.setState({selectedReadRight});
    };

    handleSelectSharedWriteRights = ({target: {options}}) => {
        let selectedWriteRight = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedWriteRight.push(options[i].value);
            }
        }
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
                                    <select multiple value={selectedReadRight}
                                            onChange={this.handleSelectSharedReadRights}>
                                        {readRights.map(c => <option key={c.id}
                                                                     value={c.id}>{c.name + ' ' + c.lastName}</option>)}
                                    </select>
                                </div>
                                <div className={'dialog__column'}>
                                    <button className={'button button_borderless'}
                                            onClick={this.addReadRight}>{'<<'}</button>
                                    <button className={'button button_borderless'}
                                            onClick={this.deleteReadRight}>{'>>'}</button>
                                </div>
                                <div className={'dialog__column'}>
                                    <span>{'No'}</span>
                                    <select multiple value={selectedNoRight} onChange={this.handleSelectCoordinators}>
                                        {noRight.map(c => <option key={c.id}
                                                                  value={c.id}>{c.name + ' ' + c.lastName}</option>)}
                                    </select>
                                </div>
                                <div className={'dialog__column'}>
                                    <button className={'button button_borderless'}
                                            onClick={this.deleteWriteRight}>{'<<'}</button>
                                    <button className={'button button_borderless'}
                                            onClick={this.addWriteRight}>{'>>'}</button>
                                </div>
                                <div className={'dialog__column'}>
                                    <span>{'Write'}</span>
                                    <select multiple value={selectedWriteRight}
                                            onChange={this.handleSelectSharedWriteRights}>
                                        {writeRights.map(c => <option key={c.id}
                                                                      value={c.id}>{c.name + ' ' + c.lastName}</option>)}
                                    </select>
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