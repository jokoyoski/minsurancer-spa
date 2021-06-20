import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';
import { store } from '../../../../redux-store/store';
import * as employeeService from "../../../../services/employeeService";


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]


const initialFValues = {
    id: 0,
    firttName: '',
    lastName: '',
    phonenNmber: '',
    email: '',
    city: '',
    roleId: '',
    gender: 'male',
    hireDate: new Date(),
    dateCreated: new Date(),
    isPermanent: false,
}

export default function AddEmployeeForm(props) {
    const { addEmployee, recordForEdit, cacNumber, userType,roles,setOpenPopup,setAddOpenPopup } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This lastName is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This email is required."
        if ('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 numbers required."

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            var result = { ...values, 'cacNumber': cacNumber, 'userType': userType }
              store.dispatch({ type: "LOADING_BUTTON_SPINNER" })
            addEmployee(result, resetForm);
            setOpenPopup(false)
           setAddOpenPopup(false)
          store.dispatch({ type: "LOADING_BUTTON_SPINNER" })
        }
    }

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="firstName"
                        label="First Name"
                        value={values.firstName || ''}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    <Controls.Input
                        label="Last Name"
                        name="lastName"
                        value={values.lastName || ''}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email || ''}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                      <Controls.Select
                           name="roleId"
                           label="Roles"
                           value={values.roleId || ""}
                          onChange={handleInputChange}
                          options={roles}
                         />
                    <Controls.Input
                        label="Phone Number"
                        name="phoneNumber"

                        value={values.phoneNumber || ''}
                        onChange={handleInputChange}
                        error={errors.phoneNumber}
                    />
                    <div>
                            <button style={{backgroundColor:"#333996"}} className='final-button'>Sign In <i className={store.getState().utilityReducer.buttonloader === true ? "fa fa-spinner fa-spin" : ''}></i></button>
          
                    </div>
                </Grid>


            </Grid>
        </Form>
    )
}
