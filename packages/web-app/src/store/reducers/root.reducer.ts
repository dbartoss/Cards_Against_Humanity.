import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducer';

export interface RootState {
    auth: AuthState;
    router?: any;
}

export const rootReducer = combineReducers<RootState>({
    auth: authReducer
});
