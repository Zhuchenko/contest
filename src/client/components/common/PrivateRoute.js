import React from "react";
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {ErrorPage} from './errorPages/'

const Wrapper = ({errorCode, ComponentToRender, ...rest}) => {

    return <>
        {
            errorCode
                ? <ErrorPage errorCode={errorCode}/>
                : <ComponentToRender {...rest} />
        }
    </>;
};

const ConnectedWrapper = connect((state) => ({
    errorCode: state.application.errorCode,
}))(Wrapper);

const PrivateRoute = ({component, isAuthorized, isFetching, isForbidden, ...rest}) => {
    const ComponentToRender = component;

    return <Route
        {...rest}
        render={props =>
            isFetching ? <div>Fetching...</div> : (isAuthorized ?
                    <ConnectedWrapper ComponentToRender={ComponentToRender} {...props}/> : (
                        <Redirect
                            to={{pathname: "/", state: {from: props.location}}}
                        />)
            )
        }
    />;
};

const mapStateToProps = (state) => ({
    isAuthorized: state.application.authorized,
    isFetching: state.application.isFetching,
    errorCode: state.application.errorCode,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));