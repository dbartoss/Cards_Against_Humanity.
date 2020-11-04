import { setAuthToken } from '../../helpers/request.helper';
import { AppThunk } from '../../models/app-thunk.model';
import { LoginForm } from '../../models/auth.model';
import { logInUserService } from '../../services/auth/login.service';
import { signInUser, signInUserError, signInUserSuccess } from '../actions/auth.actions';


export const loginUser = (loginFormValues: LoginForm): AppThunk => async dispatch => {
    try {
        dispatch(signInUser());
        const { data } = await logInUserService(loginFormValues);

        if (!data?.token) {
            new Error('Missing token');
        }

        const { token } = data;

        setAuthToken(token);
        dispatch(signInUserSuccess({ token }));
    } catch (error) {
        dispatch(signInUserError());
        throw error;
    }
};
