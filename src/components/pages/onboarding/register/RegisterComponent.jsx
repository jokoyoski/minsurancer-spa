
import './register.styles.scss';
import Logo from '../../../../assets/images/miniinsurance.png'
import React from 'react'
import { connect } from "react-redux";
import { Grid, } from '@material-ui/core';
import { Form } from '../../../controls/useForm';
import useForm from '../../../../formData/useForm';
import validate from '../../../../formData/validate';
import Input from '../../../controls/Input/InputCompnent';
import '../../../controls/Input/form.styles.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageComponent from '../image-section/ImageComponent';


const initialState = {
    password: {
        value: '',
        required: true
    },
    email: {
        value: '',
        required: true
    },
    firstname: {
        value: '',
        required: true
    },
    lastname: {
        value: '',
        required: true
    },
    phonenumber: {
        value: '',
        required: true
    },
    confirmpassword: {
        value: '',
        required: true
    },
}
export const RegisterComponent = ({ RegisterUser, buttonloader, triggerLogging, isRegisterSuccessful }) => {

    const phoneNumberFormatter = (value) => {
        // if (value === '') return;

        if (value.startsWith('080')) {
            return `+234${value.slice(1)}`
        }

        if (value.startsWith('070')) {
            return `+234${value.slice(1)}`
        }

        if (value.startsWith('081')) {
            return `+234${value.slice(1)}`
        }

        if (value.startsWith('090')) {
            return `+234${value.slice(1)}`
        }

        if (value.startsWith('234')) {
            return `+${value}`
        }
        return value
    }

    const { formData, errors, changeHandler, setErrors } = useForm(initialState, validate);
    const submitHandler = (e) => {
        e.preventDefault();
        let formErrors = validate(formData, true);
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            const data = new FormData();
            for (let pair of data.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
            var userDetails = {
                firstname: formData.firstname.value,
                lastname: formData.lastname.value,
                email: formData.email.value,
                password: formData.password.value,
                confirmpassword: formData.confirmpassword.value,
                phonenumber: phoneNumberFormatter(formData.phonenumber.value),
            }
            localStorage.setItem("userEmail", userDetails.email)
            localStorage.setItem("userPassword", userDetails.password)
            RegisterUser(userDetails)
        }

    }
    return (
        <div style={{ display: 'flex' }}>
            <ImageComponent />
            <div className='register-section'>
                <div className='inner-section'>
                    <div className='inner-inner'>
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', width: '90%' }}>
                            <img alt={"logo"} width={'50px'} src={Logo} />
                        </div>
                        <p style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '700', fontSize: '1.5rem', textAlign: 'center', width: '90%', marginTop: '50px' }}>Create your account</p>
                        <p style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', color: 'gray', textAlign: 'center', width: '90%', marginTop: '5px' }}>Enter your details to create your account</p>

                        <div className='real-form'>
                            <ToastContainer />
                            <Form onSubmit={submitHandler}>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', margin: '0 auto' }}>
                                    <Input
                                        label="First Name"
                                        name="firstname"
                                        placeholder="Enter your First Name"
                                        id="firstname"
                                        value={formData.firstname.value}
                                        onChange={changeHandler}
                                        error={errors.firstname}
                                    />
                                    <Input
                                        label="Last Name"
                                        name="lastname"
                                        placeholder="Enter your Last Name"
                                        id="lastname"
                                        value={formData.lastname.value}
                                        onChange={changeHandler}
                                        error={errors.lastname}
                                    />
                                    <Input
                                        label="Phone Number"
                                        name="phonenumber"
                                        placeholder="Enter your Phone Number"
                                        id="phonenumebr"
                                        value={formData.phonenumber.value}
                                        onChange={changeHandler}
                                        error={errors.phonenumber}
                                    />


                                    <Input
                                        label="Email"
                                        name="email"
                                        placeholder="Enter your Email"
                                        id="name"
                                        value={formData.email.value}
                                        onChange={changeHandler}
                                        error={errors.email}
                                    />

                                    <Input
                                        label="Password"
                                        name="password"
                                        placeholder="Enter your Password"
                                        id="password"
                                        type="password"
                                        value={formData.password.value}
                                        onChange={changeHandler}
                                        error={errors.password}
                                    />
                                    <Input
                                        label="Confirm Password"
                                        name="confirmpassword"
                                        placeholder="Enter your Confirm Password"
                                        id="confirmpassword"
                                        type="password"
                                        value={formData.confirmpassword.value}
                                        onChange={changeHandler}
                                        error={errors.confirmpassword}
                                    />
                                    <button className='final-button'>Register <i className={buttonloader === true ? "fa fa-spinner fa-spin" : ''}></i></button>
                                </div>
                                <Grid container>
                                    <div className='agreement'>
                                        <p>Already have an account?</p> <a href='/user/login' style={{ color: 'blue', cursor: 'pointer' }}>Login</a>
                                    </div>
                                </Grid>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}



function mapStateToProps(state) {
    return {
        loading: state.userReducer.loader,
        user: state.userReducer.user,
        triggerLogging: state.userReducer.triggerLogging,
        buttonloader: state.utilityReducer.buttonloader,
        isRegisterSuccessful: state.utilityReducer.isRegisterSuccessful
    };
}
const mapDispatchToProps = (dispatch) => ({

    RegisterUser(payload) {
        dispatch({ type: "REGISTER_USER", payload });
    },
    SetError() {
        dispatch({ type: "API_ERRORED" });
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterComponent);

