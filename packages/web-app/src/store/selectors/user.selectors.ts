import { RootState } from '../reducers/root.reducer';
import { UserState } from '../reducers/user.reducer';

export const userSelector = (state: RootState): UserState => state.user;
export const userIdSelector = (state: RootState): string | null => userSelector(state).userId;
export const usernameSelector = (state: RootState): string | null => userSelector(state).username;
