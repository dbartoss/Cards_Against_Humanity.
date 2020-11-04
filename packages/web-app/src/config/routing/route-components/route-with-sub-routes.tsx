import * as React from 'react';
import { Route } from 'react-router-dom';

import { IRoute } from '../../../models/route.model';

const RouteWithSubRoutes = (route: IRoute): JSX.Element => {
    return (
        <Route
            path={route.path}
            render={props => (<route.component {...props} routes={route.routes} />)}
        />
    );
};

export default RouteWithSubRoutes;
