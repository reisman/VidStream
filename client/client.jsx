import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import VideoPlayer from './VideoPlayer';

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <VideoPlayer />
    </Provider>,
    document.getElementById('root'),
);
