import { setAuthToken } from '../../helpers/request.helper';
import { AppThunk } from '../../models/app-thunk.model';
import { LoginForm } from '../../models/auth.model';
import { logInUserService } from '../../services/auth/login.service';
import { logoutUser, logoutUserError, logoutUserSuccess, signInUser, signInUserError, signInUserSuccess } from '../actions/auth.actions';
import { setUser } from '../actions/user.actions';


export const loginUser = (loginFormValues: LoginForm, redirectTo: Function): AppThunk => async dispatch => {
    try {
        await dispatch(signInUser());
        const res = await logInUserService(loginFormValues);

        if (!res) {
            return dispatch(signInUserError());
        }

        const { token, user } = res.data;

        setAuthToken(token);


        await dispatch(signInUserSuccess({ token }));
        await dispatch(setUser({ username: user?.username, userId: user?.id }));

        redirectTo('/dashboard');
    } catch (error) {
        dispatch(signInUserError());
    }
};

export const logout = (redirectTo: Function): AppThunk => async dispatch => {
    try{
        await dispatch(logoutUser());
        await dispatch(logoutUserSuccess());
        redirectTo('/login');
    }  catch (error) {
        console.error(error);
        dispatch(logoutUserError());
    }
};
