import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'react-router/Router'
import {createBrowserHistory} from 'history'
import AppView from './components/layout/appview'
import reducer from './redux/rootReducer'
import rootSaga from './redux/rootSaga'
import  { createStore, sagaMiddleware } from './utilities/createStore'
import {init} from './redux/rootActions';

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
    module.hot.accept('./components/layout/appview', () => {
        const nextApp = require('./components/layout/appview').default;
        renderApp(nextApp)
    });

    module.hot.accept('./redux/rootReducer', () => {
        const nextReducer = require('./redux/rootReducer').default;
        store.replaceReducer(nextReducer)
    });

    module.hot.accept('./redux/rootSaga', () => {
        const newRootSaga = require('./redux/rootSaga').default;
        sagaRun.cancel();
        sagaRun.done.then(() => {
            sagaRun = sagaMiddleware.run(function* replaceSaga() {
                yield newRootSaga({ history })
            })
        })
    })
}