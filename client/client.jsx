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

const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(rootReducer),
    compose(
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
                    <Route component={VideoList} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
