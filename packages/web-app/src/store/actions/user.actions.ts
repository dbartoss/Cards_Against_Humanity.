import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';

export enum Type {
    SET_USER = 'SET_USER',
}

export const setUser = createAction(Type.SET_USER);

const actions = {
    setUser,
};

export const useUserActions = (dispatch: Dispatch): typeof actions => {
    return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]);
};
