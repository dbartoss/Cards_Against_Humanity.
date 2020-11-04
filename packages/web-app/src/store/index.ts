import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as thunk } from 'redux-thunk';

import { RootState, rootReducer } from './reducers/root.reducer';
import { logger } from './middlewares/logger';


export function configureStore(initialState?: RootState): Store<RootState> {
    let middleware = applyMiddleware(thunk, logger);

    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware);
    }

    return createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;
}
