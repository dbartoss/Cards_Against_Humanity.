import { handleActions } from 'redux-actions';
import { Type } from '../actions/user.actions';

export interface UserState {
    userId: string | null;
    username: string | null;
}

const initialState: UserState = {
    userId: null,
    username: null,
};

export const userReducer = handleActions<UserState, UserState>(
    {
        [Type.SET_USER]: (state, action) => {
            let newState = { ...state };

            if (action?.payload?.userId) {
                newState = { ...newState, userId: action.payload.userId };
            }

            if (action?.payload?.username) {
                newState = { ...newState, username: action.payload.username };
            }

            return newState;
        },
    },
    initialState
);
