import { handleActions } from 'redux-actions';
import { AuthModel } from '../../models/auth.models';
import { AuthActions } from '../actions/auth.actions';
import { RootState } from './root.reducer';

const initialState: RootState.AuthState = {
    token: null,
};

export const authReducer = handleActions<RootState.AuthState, AuthModel>(
    {
        [AuthActions.Type.SIGN_IN]: (state, action) => {
            if (action?.payload?.token) {
                return { ...state, token: action.payload.token };
            }
            return state;
        },
    },
    initialState
);
