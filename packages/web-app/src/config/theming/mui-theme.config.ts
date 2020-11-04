import { createMuiTheme } from '@material-ui/core/styles';

export const muiThemeConfig = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ff9800',
            light: '#00acc1',
            dark: '#fbc02d',
        },
        secondary: {
            main: '#2979ff',
            light: '#0091ea',
            dark: '#00b0ff',
        },
    },
});
