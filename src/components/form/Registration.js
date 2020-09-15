import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux';
import {userPostThunk} from '../../store/reducers/auth/auth.reducer';

import {Link} from 'react-router-dom';
import {
    Button,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    Divider,
    FormHelperText,
    // TextField,
    // Card,
    // InputAdornment,
    // IconButton,
    // Input,
    // Icon,
} from '@material-ui/core';


function InnerForm({ handleSubmit, form, submitting, pristine, values }) {
    return(
        <React.Fragment>

            <Typography
                className="text-uppercase"
                component="h2"
                variant="h6"
                color="primary"
                align="center"
            >
                Sign-up
            </Typography>

            <form onSubmit={handleSubmit} autoComplete="off" className="d-flex flex-column align-content-center">

                <Field name="first_name" >
                    {({ input, meta }) => (
                        <FormControl required error={meta.error && meta.touched} variant="outlined" className="w-100 mt-4 mt-2">
                            <InputLabel htmlFor="component-outlined">First name</InputLabel>
                            <OutlinedInput label="first_name" {...input} />
                            <FormHelperText>{meta.error && meta.touched && <span>{meta.error}</span>}</FormHelperText>
                        </FormControl>
                    )}
                </Field>

                <Field name="last_name" >
                    {({ input, meta }) => (
                        <FormControl required error={meta.error && meta.touched} variant="outlined" className="w-100 mt-4 mt-2">
                            <InputLabel htmlFor="component-outlined">Last name</InputLabel>
                            <OutlinedInput label="last_name" {...input} />
                            <FormHelperText>{meta.error && meta.touched && <span>{meta.error}</span>}</FormHelperText>
                        </FormControl>
                    )}
                </Field>

                <Field name="email" >
                    {({ input, meta }) => (
                        <FormControl required error={meta.error && meta.touched} variant="outlined" className="w-100 mt-4 mt-2">
                            <InputLabel htmlFor="component-outlined">Email</InputLabel>
                            <OutlinedInput label="email" {...input} />
                            <FormHelperText>{meta.error && meta.touched && <span>{meta.error}</span>}</FormHelperText>
                        </FormControl>
                    )}
                </Field>

                <Field name="password" >
                    {({ input, meta }) => (
                        <FormControl required error={meta.error && meta.touched} variant="outlined" className="w-100 mt-4 mt-2">
                            <InputLabel htmlFor="component-outlined">Password</InputLabel>
                            <OutlinedInput type="password" label="password" {...input} />
                            <FormHelperText>{meta.error && meta.touched && <span>{meta.error}</span>}</FormHelperText>
                        </FormControl>
                    )}
                </Field>

                <Field name="password_confirm" >
                    {({ input, meta }) => (
                        <FormControl required error={meta.error && meta.touched} variant="outlined" className="w-100 mt-4 mt-2">
                            <InputLabel htmlFor="component-outlined">Password confirmed</InputLabel>
                            <OutlinedInput type="password" label="password_confirm" {...input} />
                            <FormHelperText>{meta.error && meta.touched && <span>{meta.error}</span>}</FormHelperText>
                        </FormControl>
                    )}
                </Field>

                <Divider className="my-3" />
                <Button
                    className="mx-auto mb-2 w-100"
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                >
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/login"
                >
                    Login
                </Button>
            </form>
        </React.Fragment>
    )
}

class RegistrationForm extends Component {
    onSubmit(data) {
        this.props.postUser(data)
    }

    render() {
        const self = this;
        return(
            <Form
                onSubmit={this.onSubmit.bind(self)}
                validate={fields => {
                    const errors = {};
                    if (!fields.email) {
                        errors.email = 'Required'
                    }
                    if (!fields.password) {
                        errors.password = 'Required'
                    }
                    return errors
                }}
                render={InnerForm}
            />

        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    postUser: (props)=>dispatch(userPostThunk(props)),
});


export default connect(null, mapDispatchToProps)(RegistrationForm);