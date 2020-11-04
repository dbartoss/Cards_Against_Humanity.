import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { muiThemeConfig, RoutesConfig } from './config';

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={muiThemeConfig}>
                <RoutesConfig/>
        </ThemeProvider>
    );
};
