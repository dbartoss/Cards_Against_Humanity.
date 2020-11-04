import { AppThunk } from '../../models/app-thunk.model';
import { LoginForm } from '../../models/auth.models';
import { signInUser } from '../actions/auth.actions';


export const loginUser = (loginFormValues: LoginForm): AppThunk => async dispatch => {
    dispatch(signInUser());
};
