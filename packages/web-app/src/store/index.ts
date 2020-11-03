// import { createStore } from 'redux';
// import { defaultReducer } from './reducers/default.reducer';
//
// export const store = createStore(defaultReducer);

import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer } from './reducers/root.reducer';
import { logger, thunk } from './middlewares';


export function configureStore(initialState?: RootState): Store<RootState> {
    let middleware = applyMiddleware(thunk, logger);

    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware);
    }


    return createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;
}
