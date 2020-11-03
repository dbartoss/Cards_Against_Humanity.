import * as React from 'react';
import { Container, ThemeProvider } from '@material-ui/core';
import { muiTheme, RoutesConfig } from './config';

export const App = () => {
    return (
        <ThemeProvider theme={muiTheme}>
            <Container>
                <RoutesConfig/>
            </Container>
        </ThemeProvider>
    );
}
