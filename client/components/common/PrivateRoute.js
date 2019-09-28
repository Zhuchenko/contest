import React from "react";
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const PrivateRoute = ({component, isAuthorized, isFetching, ...rest}) => {
    let ComponentToRender = component;

    return (
        <Route
            {...rest}
            render={props =>
                isFetching
                    ? (<div>Fetching...</div>)
                    : (isAuthorized
                        ? (<ComponentToRender {...props} />)
                        : (
                            <Redirect
                                to={{pathname: "/", state: {from: props.location}}}
                            />)
                    )
            }
        />
    );
};

const mapStateToProps = (state) => ({
    isAuthorized: state.application.authorized,
    isFetching: state.application.isFetching,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));