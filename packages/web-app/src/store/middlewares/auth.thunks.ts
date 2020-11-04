import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LoginForm } from '../../models/auth.models';
import { signInUser } from '../actions/auth.actions';
import { RootState } from '../reducers/root.reducer';

export const loginUser = (loginFormValues: LoginForm): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    console.log(loginFormValues);

    await dispatch(signInUser);
};
