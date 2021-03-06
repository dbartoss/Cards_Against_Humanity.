import * as React from 'react';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps & { severity: Color }): JSX.Element => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
