import * as React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { IRoute } from '../../../models/route.model';
import { tokenSelector } from '../../../store/selectors/auth.selectors';
import RouteWithSubRoutes from './route-with-sub-routes';

const ProtectedRoute = (props: IRoute): JSX.Element => {
    const isAuthenticated = !!useSelector(tokenSelector);
    return isAuthenticated ? <RouteWithSubRoutes {...props} /> : <Redirect to={{ pathname: '/login' }}/>;
}

export default ProtectedRoute;
