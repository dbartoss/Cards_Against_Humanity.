import * as React from 'react';
import { Container, ThemeProvider } from '@material-ui/core';
import { muiThemeConfig, RoutesConfig } from './config';

export const App = () => {
    return (
        <ThemeProvider theme={muiThemeConfig}>
            <Container>
                <RoutesConfig/>
            </Container>
        </ThemeProvider>
    );
}
