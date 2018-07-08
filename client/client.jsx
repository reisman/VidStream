import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers';
import VideoList from './video_overview/VideoList';
import VideoPlayer from './VideoPlayer';
import Login from './authentication/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir } from './authentication/auth';

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        ),
    ),
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route path="/video" component={VideoPlayer} />
                    <Route path="/login" component={Login} />
                    <Route component={VideoList} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
