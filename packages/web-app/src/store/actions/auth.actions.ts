import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';

export enum Type {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    LOGOUT = 'LOGOUT',
    SIGN_IN_ERROR = 'SIGN_IN_ERROR',
    SIGN_UP_ERROR = 'SIGN_UP_ERROR',
    LOGOUT_ERROR = 'LOGOUT_ERROR',
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
}

export const signInUser = createAction(Type.SIGN_IN);
export const signInUserSuccess = createAction(Type.SIGN_IN_SUCCESS);
export const signInUserError = createAction(Type.SIGN_IN_ERROR);

export const signUpUser = createAction(Type.SIGN_UP);
export const signUpUserSuccess = createAction(Type.SIGN_UP_SUCCESS);
export const signUpUserError = createAction(Type.SIGN_UP_ERROR);

export const logoutUser = createAction(Type.LOGOUT);
export const logoutUserSuccess = createAction(Type.LOGOUT_SUCCESS);
export const logoutUserError = createAction(Type.LOGOUT_ERROR);

const actions = {
    signInUser,
    signInUserSuccess,
    signInUserError,

    signUpUser,
    signUpUserSuccess,
    signUpUserError,

    logoutUser,
    logoutUserSuccess,
    logoutUserError,
};

export const useAuthActions = (dispatch: Dispatch): typeof actions => {
    return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]);
};
