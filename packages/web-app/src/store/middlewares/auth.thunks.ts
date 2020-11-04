import { setAuthToken } from '../../helpers/request.helper';
import { AppThunk } from '../../models/app-thunk.model';
import { LoginForm } from '../../models/auth.model';
import { logInUserService } from '../../services/auth/login.service';
import { signInUser, signInUserError, signInUserSuccess } from '../actions/auth.actions';


export const loginUser = (loginFormValues: LoginForm, redirectTo: Function): AppThunk => async dispatch => {
    try {
        await dispatch(signInUser());
        const res = await logInUserService(loginFormValues);

        if (!res) {
            return dispatch(signInUserError());
        }

        const { token } = res.data;

        setAuthToken(token);
        await dispatch(signInUserSuccess({ token }));
        redirectTo('/dashboard');
    } catch (error) {
        dispatch(signInUserError());
    }
};
