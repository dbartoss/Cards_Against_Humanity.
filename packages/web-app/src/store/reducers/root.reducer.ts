import { combineReducers } from 'redux';
import { AuthModel } from '../../models/auth.models';
import { authReducer } from './auth.reducer';

export interface RootState {
    auth: AuthModel;
    router?: any;
}


export const rootReducer = combineReducers<RootState>({
    auth: authReducer
});
