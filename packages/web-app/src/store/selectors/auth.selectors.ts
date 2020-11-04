import { AuthState } from '../reducers/auth.reducer';
import { RootState } from '../reducers/root.reducer';

export const authSelector = (state: RootState): AuthState => state.auth;
export const tokenSelector = (state: RootState): string | null => authSelector(state).token;
