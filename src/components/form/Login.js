import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userLoginThunk} from '../../store/reducers/auth/auth.reducer';
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

// import {
//     Visibility,
//     VisibilityOff,
// } from '@material-ui/icons';

function InnerForm({ handleSubmit, form, submitting, pristine, values }) {
    // const [value, setValues] = React.useState({
    //     amount: '',
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     showPassword: false,
    // });

    return(
        <React.Fragment>

            <Typography
                className="text-uppercase"
                component="h2"
                variant="h6"
                color="primary"
                align="center"
            >
                Sign-in
            </Typography>

            <form onSubmit={handleSubmit} autoComplete="off" className="d-flex flex-column align-content-center">

                <Field name="email">
                    {({ input, meta }) => (
                        <FormControl error={meta.error && meta.touched} variant="outlined" className="w-100 mt-4 mt-2">
                            <InputLabel htmlFor="component-outlined">Email</InputLabel>
                            <OutlinedInput label="email" {...input} />
                            <FormHelperText>{meta.error && meta.touched && <span>{meta.error}</span>}</FormHelperText>
                        </FormControl>
                    )}
                </Field>

                <Field name="password" >
                    {({ input, meta }) => (
                        <FormControl error={meta.error && meta.touched} variant="outlined" className="w-100 mt-4 mt-2">
                            <InputLabel htmlFor="component-outlined">Password</InputLabel>
                            <OutlinedInput type="password" label="password" {...input} />
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
                    // endIcon={<Icon>send</Icon>}
                >
                    Submit
                </Button>

                <Button
                    component={Link}
                    variant="outlined"
                    size="large"
                    color="primary"
                    to="/registration"
                >
                    Registration
                </Button>
            </form>

        </React.Fragment>


    )
}

class LoginForm extends Component {
    onSubmit(data) {
        this.props.loginUser(data);
    }

    render() {
        return(
            <Form
                onSubmit={this.onSubmit.bind(this)}
                validate={fields => {
                    const errors = {};
                    if (!fields.email) {
                        errors.email = "Email is Required"
                }
                    if (!fields.password) {
                        errors.password = "Password is Required"
                    }
                    // if (!values.confirm) {
                    //     errors.confirm = 'Required'
                    // } else if (values.confirm !== values.password) {
                    //     errors.confirm = 'Must match'
                    // }
                    return errors
                }}
                render={InnerForm}
            />

        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (props)=>dispatch(userLoginThunk(props)),
});

export default connect(null,mapDispatchToProps)(LoginForm);