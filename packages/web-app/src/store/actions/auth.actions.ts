import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { Action, ActionFunctionAny, createAction } from 'redux-actions';

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
export const signUpUser = createAction(Type.SIGN_UP);
export const logoutUser = createAction(Type.LOGOUT);

const actions: ActionFunctionAny<Action<any>>[] = [
    signInUser,
    signUpUser,
    logoutUser,
];

export const useAuthActions = (dispatch: Dispatch) => {
    return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]);
};
