import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'react-router/Router'
import {createBrowserHistory} from 'history'
import AppView from './layout/appview'
import reducer from './rootReducer'
import rootSaga from './rootSaga'
import  { createStore, sagaMiddleware } from './utilities/createStore'
import {init} from './rootActions';

const history = createBrowserHistory();
const store = createStore(reducer);
let sagaRun = sagaMiddleware.run(function* () {
    yield rootSaga({ history })
});

store.dispatch(init());

const renderApp = (app) => {
    ReactDOM.render(
        <Provider store={store}>
                <Router history={history}>
                    {app}
                </Router>
        </Provider>,
        document.getElementById('root')
    )
};

renderApp(<AppView />);

if (module.hot) {
    module.hot.accept('./layout/appview', () => {
        const nextApp = require('./layout/appview').default;
        renderApp(nextApp)
    });

    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer').default;
        store.replaceReducer(nextReducer)
    });

    module.hot.accept('./rootSaga', () => {
        const newRootSaga = require('./rootSaga').default;
        sagaRun.cancel();
        sagaRun.done.then(() => {
            sagaRun = sagaMiddleware.run(function* replaceSaga() {
                yield newRootSaga({ history })
            })
        })
    })
}