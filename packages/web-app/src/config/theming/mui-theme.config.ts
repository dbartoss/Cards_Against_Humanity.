import { createMuiTheme } from '@material-ui/core/styles';
import { grey, lime } from '@material-ui/core/colors';

export const muiThemeConfig = createMuiTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: lime[400],
        },
    },
});
