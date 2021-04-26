
import './add-company.styles.scss';
import React from 'react'
import { connect } from "react-redux";
import { Form } from '../../../controls/useForm';
import useForm from '../../../../formData/useForm';
import validate from '../../../../formData/validate';
import { ToastContainer } from 'react-toastify';
import Input from '../../../controls/Input/InputCompnent';
import Select from '../../../controls/Input/Select';
import '../../../controls/Input/form.styles.scss';
import 'react-toastify/dist/ReactToastify.css';




const initialState = {
    companyname: {
        value: '',
        required: true
    },
    cacnumber: {
        value: '',
        required: true
    },
    address: {
        value: '',
        required: true
    },
    industry: {
        value: '',
        required: true
    }

}

export const AddCompanyCompnent = ({ AddCompany, buttonloader, userId,industries}) => {
    var userDetails = null;

    const { formData, errors, changeHandler, setErrors } = useForm(initialState, validate);
    const submitHandler = (e) => {
        e.preventDefault();
        let formErrors = validate(formData, true);
        var result = { ...formErrors, "confirmpassword": "Password not equal with confirm password" }
        setErrors(result);
        //  const datas = new FormData();
        if (Object.keys(formErrors).length === 0) {
            const data = new FormData();
            for (let pair of data.entries()) {
              //  console.log(`${pair[0]}: ${pair[1]}`);
            }
            var companyDetails = {
                companyname: formData.companyname.value,
                cacnumber: formData.cacnumber.value,
                address: formData.address.value,
                industryId: formData.industry.value,
                userId: userId
            }
            localStorage.setItem("cacNumber", companyDetails.cacnumber);
            AddCompany(companyDetails)
        }

    }
    return (
        <div className='add-company'>
            <div className='first-card'>
                <img style={{ marginTop: '40px' }} src="https://avatars3.githubusercontent.com/u/21162888?s=460&v=4" alt="avatar" className='avatar cursor-pointer' />
                <p>Hello Oladeinde Adeola</p>
                <p>Thank you for registering, Kindly fill in your company's details to proceed</p>
                <div className='first-box'></div>
                <div className='second-box'></div>
                <div className='third-box'></div>
                <div className='fourth-box'></div>
                <div className='fifth-box'></div>
                <div className='sixth-box'></div>
                <div className='seventh-box'></div>
                <div className='eight-box'></div>
                <div className='nineth-box'></div>
            </div>
            <div className='second-card'>
                <ToastContainer />
                <p style={{ color: '#777777', textAlign: 'center' }}>COMPANY'S INFORMATION</p>
                <Form onSubmit={submitHandler}>
                    <Input
                        label="Company Name"
                        name="companyname"
                        placeholder="Name of Company"
                        id="companyname"
                        value={formData.companyname.value}
                        onChange={changeHandler}
                        error={errors.companyname}
                    />

                    <Select
                        label="Industry"
                        name="industry"
                        id="industry"
                        options={industries}
                        value={formData.industry.value}
                        onChange={changeHandler}
                        error={errors.industry}
                    />
                    <Input
                        label="Address"
                        name="address"
                        placeholder="Address"
                        id="address"
                        value={formData.address.value}
                        onChange={changeHandler}
                        error={errors.address}
                    />

                    <Input
                        label="CAC Number"
                        name="cacnumber"
                        placeholder="Cac Number"
                        id="cacumber"
                        value={formData.cacnumber.value}
                        onChange={changeHandler}
                        error={errors.cacnumber}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='save-button'>Save & Continue <i class={buttonloader === true ? "fa fa-spinner fa-spin" : ''}></i></button>
                    </div>

                </Form>
            </div>
        </div>

    )
}



function mapStateToProps(state) {
    return {
        buttonloader: state.utilityReducer.buttonloader,
        user: state.userReducer.user,
        userId:state.userReducer.userId,
        industries: state.userReducer.industries,
    };
}
const mapDispatchToProps = (dispatch) => ({

    AddCompany(payload) {
        dispatch({ type: "ADD_COMPANY", payload });
    },
    SetError() {
        dispatch({ type: "API_ERRORED" });
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCompanyCompnent);

