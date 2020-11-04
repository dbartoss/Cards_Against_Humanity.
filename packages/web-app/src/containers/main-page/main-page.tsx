import * as React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from 'formik-material-ui';
import { Form, Formik, Field } from 'formik';

import './style.css';
import { LoginForm } from '../../models/auth.model';
import { loginUser } from '../../store/middlewares/auth.thunks';
import { tokenSelector } from '../../store/selectors/auth.selectors';

const LOGIN_FORM_INITIAL_VALUES: Readonly<LoginForm> = Object.freeze({ username: '', password: '' });

const MainPage = (props) => {
    const dispatch = useDispatch();

    const submitFn = (values: LoginForm, { setSubmitting })  => {
        console.log(values);
        dispatch(loginUser(values));
        setTimeout(() => setSubmitting(false), 1000);
    };

    const auth = useSelector(tokenSelector);

    console.log(auth);

    return (
        <div className="container">
            <Typography variant="h5">Sign in</Typography>
            <Paper elevation={1} className="paper">
                <Formik initialValues={LOGIN_FORM_INITIAL_VALUES} onSubmit={submitFn}>
                    {({ submitForm, isSubmitting }) => (
                        <Form className="form">
                            <Field className="margin-bottom" component={TextField} name="username" type="text" label="Username"/>
                            <Field className="margin-bottom" component={TextField} name="password" type="password" label="Password"/>
                            <Button
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
        </div>
    );
};

export default MainPage;
