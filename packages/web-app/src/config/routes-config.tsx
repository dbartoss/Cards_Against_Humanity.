import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MainPage } from '../containers/main-page';

interface IRoute {
    path: string;
    component: any;
    routes?: IRoute[];
}

const routes: IRoute[] = [
    {
        path: '/',
        component: MainPage
    },
];

const RouteWithSubRoutes = (route: IRoute) => {
    return (
        <Route
            path={route.path}
            render={props => (<route.component {...props} routes={route.routes} />)}
        />
    );
}

export const RoutesConfig = () => {

    const config = routes.map((route: IRoute, index: number) => (
        <RouteWithSubRoutes key={index} {...route} />
    ));

    return (
        <BrowserRouter>
            <Switch>
                {config}
            </Switch>
        </BrowserRouter>
    );
};
