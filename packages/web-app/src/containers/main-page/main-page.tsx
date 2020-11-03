import * as React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Form, Formik, Field } from 'formik';
import './style.css'

export interface ILoginForm {
    email: string;
    password: string;
}

export class MainPage extends React.Component<any, any> {
    private readonly LOGIN_FORM_INITIAL_VALUES: Readonly<ILoginForm> = Object.freeze({ email: '', password: '' });

    private submitFn(values: ILoginForm, { setSubmitting })  {
        console.log(values);
        setTimeout(() => setSubmitting(false), 1000);
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <Typography variant="h5">Sign in</Typography>
                <Paper elevation={1} className="paper">
                    <Formik initialValues={this.LOGIN_FORM_INITIAL_VALUES} onSubmit={this.submitFn}>
                        {({ submitForm, isSubmitting }) => (
                            <Form className="form">
                                <Field className="margin-bottom" component={TextField} name="email" type="email" label="E-mail"/>
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
    }
}
