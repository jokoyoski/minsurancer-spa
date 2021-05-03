
import './login.styles.scss';
import Logo from '../../../../assets/images/miniinsurance.png'
import { connect } from "react-redux";
import React from 'react'
import { Grid, } from '@material-ui/core';
import { Form } from '../../../controls/useForm';
import useForm from '../../../../formData/useForm';
import validate from '../../../../formData/validate';
import Input from '../../../controls/Input/InputCompnent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../controls/Input/form.styles.scss';
import ImageComponent from '../image-section/ImageComponent';



const initialState = {
    passwords: {
        value: '',
        required: true
    },
    email: {
        value: '',
        required: true
    },
}



export const LoginPageComponent = ({ LoginUser, triggerLogging, buttonloader }) => {

    const { formData, errors, changeHandler, setErrors } = useForm(initialState, validate);
    const submitHandler = (e) => {
        e.preventDefault();

        var userDetails = {
            email: formData.email.value,
            password: formData.passwords.value
        }
        console.log(userDetails)
        LoginUser(userDetails)
    }




    return (
        <div style={{ display: 'flex' }}>
            <ImageComponent />
            <div className='form-section'>
                <div className='inner-section'>
                    <div className='inner-inner'>
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', width: '90%' }}>
                            <img alt={"logo"}  src={Logo} />
                        </div>
                        <p style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '700', fontSize: '1.5rem', textAlign: 'center', width: '90%', marginTop: '50px' }}>Welcome Back</p>
                        <p style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', color: 'gray', textAlign: 'center', width: '90%', marginTop: '5px' }}>Enter your login details</p>

                        <div className='real-form'>
                            <ToastContainer />
                            <Form className='form' onSubmit={submitHandler}>

                                <Grid container>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', margin: '0 auto' }}>
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
                                            name="passwords"
                                            placeholder="Enter your Password"
                                            id="password"
                                            type="password"
                                            value={formData.passwords.value}
                                            onChange={changeHandler}
                                            error={errors.passwords}
                                        />
                                        <button className='final-button'>Sign In <i className={buttonloader === true ? "fa fa-spinner fa-spin" : ''}></i></button>
                                    </div>
                                    <div className='dont-have-acc-forget'>
                                        <a href='/user/forgotpassword' >Forget Password</a>
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
        buttonloader: state.utilityReducer.buttonloader
    };
}
const mapDispatchToProps = (dispatch) => ({

    LoginUser(payload) {
        dispatch({ type: "LOGIN_USER", payload });
    },
    SetError() {
        dispatch({ type: "API_ERRORED" });
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPageComponent);



