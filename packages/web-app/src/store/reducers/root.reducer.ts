import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducer';
import { roomsReducer, RoomsState } from './rooms.reducer';
import { userReducer, UserState } from './user.reducer';

export interface RootState {
    auth: AuthState;
    rooms: RoomsState;
    user: UserState,
    router?: any;
}

export const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    rooms: roomsReducer,
    user: userReducer,
});
