import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import { App } from './App';
import { configureStore } from './store';
import { history } from './config/routing';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
            <Router history={history}>
                <React.Suspense fallback={<CircularProgress color="secondary" />}>
                        <App />
                </React.Suspense>
            </Router>
    </Provider>,
    document.getElementById('root'),
);
