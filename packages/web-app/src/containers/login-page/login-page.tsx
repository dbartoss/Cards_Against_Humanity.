import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Typography, Fade } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Form, Formik, Field } from 'formik';

import './style.css';
import { LoginForm } from '../../models/auth.model';
import { loginUser } from '../../store/middlewares/auth.thunks';

const LOGIN_FORM_INITIAL_VALUES: Readonly<LoginForm> = Object.freeze({ username: '', password: '' });

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // TODO: When material-ui team will fix issues of the MuiAlert cause it breaks the app at strict mode
    // const [open, setOpen] = React.useState(false);
    // const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //
    //     setOpen(false);
    // };

    const submitFn = async (values: LoginForm): Promise<void>  => {
        await dispatch(loginUser(values, history.push));
        // await setOpen(true);  TODO: When material-ui team will fix issues of the MuiAlert cause it breaks the app at strict mode
    };

    return (
        <Fade in={true} timeout={650}>
            <div className="container">
                <Typography variant="h5" color="textPrimary">Sign in</Typography>
                <Paper elevation={1} className="paper">
                    <Formik initialValues={LOGIN_FORM_INITIAL_VALUES} onSubmit={submitFn}>
                        {({ submitForm, isSubmitting }) => (
                            <Form className="form">
                                <Field className="margin-bottom" component={TextField} name="username" type="text" label="Username"/>
                                <Field className="margin-bottom" component={TextField} name="password" type="password" label="Password"/>
                                <Button
                                    className="btn-submit"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                    onClick={submitForm}>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
                {/* TODO: When material-ui team will fix issues of the MuiAlert cause it breaks the app at strict mode */}
                {/*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>*/}
                {/*    <Alert severity="error">Cannot log in.</Alert>*/}
                {/*</Snackbar>*/}
            </div>
        </Fade>
    );
};

export default LoginPage;
