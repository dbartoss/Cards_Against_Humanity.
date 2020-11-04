import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ProtectedRoute, RouteWithSubRoutes } from './route-components';
import { IRoute } from '../../models/route.model';
import LoginPage from '../../containers/login-page';

const routes: IRoute[] = [
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/dashboard',
        component: React.lazy(() => import('../../containers/dashboard')),
        isProtected: true,
    }
];

const config = routes.map((route: IRoute, index: number) =>
    route?.isProtected ? <ProtectedRoute key={index} {...route} /> : <RouteWithSubRoutes key={index} {...route} />
);

export const RoutesConfig = () => {

    return (
        <BrowserRouter>
            <Switch>
                {config}
                <Route path={'/'} render={() => <Redirect to={{ pathname: '/login' }} />}/>
            </Switch>
        </BrowserRouter>
    );
};
