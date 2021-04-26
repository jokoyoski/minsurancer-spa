

import Logo from '../../../../assets/images/miniinsurance.png'
import React from 'react'
import { Grid, } from '@material-ui/core';
import { Form } from '../../../controls/useForm';
import useForm from '../../../../formData/useForm';
import validate from '../../../../formData/validate';
import Input from '../../../controls/Input/InputCompnent';
import '../../../controls/Input/form.styles.scss';
import history from '../../../../router/browserrouter';
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
    confirmpassword: {
        value: '',
        required: true
    },
}
export const ForgotPaswordComponent = () => {
    const { formData, errors, changeHandler, setErrors } = useForm(initialState, validate);
    const submitHandler = (e) => {
        e.preventDefault();
        let formErrors = validate(formData, true);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            const data = new FormData();
            history.push('/dashboard')
        }

    }
    return (
        <div style={{ display: 'flex' }}>
            <ImageComponent />
            <div className='register-section'>
                <div className='inner-section'>
                    <div className='inner-inner'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img alt={"logo"} height={'50px'} width={'80px'} src={Logo} />
                        </div>
                        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                            <p style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '700', fontSize: '20px', textAlign: 'center' }}>Create Your Account</p>
                            <p style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', marginLeft: '10px', textAlign: 'center', color: 'gray' }}>Enter your login details</p>
                        </div>
                        <div className='real-form'>
                            <Form onSubmit={submitHandler}>

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
                                    <button className='final-button'>Reset Password</button>

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


export default ForgotPaswordComponent