import { handleActions } from 'redux-actions';
import { Type } from '../actions/auth.actions';


export interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const authReducer = handleActions<AuthState, AuthState>(
    {
        [Type.SIGN_IN]: (state, action) => {
            if (action?.payload?.token) {
                return { ...state, token: action.payload.token };
            }
            return state;
        },
    },
    initialState
);
