import React, { useEffect, useState } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';
import { request } from '../../../../api/Service';
import { store } from '../../../../redux-store/store';


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
    roleId:'',
    city: '',
    roleId: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    dateCreated: new Date(),
    isPermanent: false,
}



export default function EmployeeForm(props) {
    console.log(props)
    var buttonloader=false;
    const {roles,recordForEdit,setOpenPopup,setAddOpenPopup}=props;
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
             if ('roleId' in fieldValues)
            temp.roleId = fieldValues.roleId ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This lastName is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This email is required."
        if ('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 numbers required."
        console.log(temp)
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }


    useEffect(() => {
        store.dispatch({ type: "DISPLAY_LOADER" })
       
        request('get', {}, `api/Authentication/user/${localStorage.getItem("email")}`).then(data => {
            setValues({
                ...data
            })
            store.dispatch({ type: "DISPLAY_LOADER" })
        }
        )

    }, [])


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
            store.dispatch({ type: "DISPLAY_LOADER" })
             buttonloader=true;
            store.dispatch({ type: "LOADING_BUTTON_SPINNER" })
            request('post', values, `api/Authentication/update-user`).then(data => {
                store.dispatch({ type: "DISPLAY_LOADER" })
                store.dispatch({ type: "LOADING_BUTTON_SPINNER" })
                setOpenPopup(false)
                setAddOpenPopup(false)
            }
            )
        }
    }



    return (
        <div style={{ marginTop: '40px', width: '950' }}>
            <h3 style={{textAlign:'center'}}>Update Profile</h3>
            <Form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '45%' }}>
                    <input type="hidden"  name="id" value={values.id}/>
                        <Controls.Input
                            name="firstName"
                            label="First Name"
                            value={values.firstName || ''}
                            style={{ width: '100%' }}
                            onChange={handleInputChange}
                            error={errors.firstName}
                        />
                        <Controls.Input
                            label="Last Name"
                            name="lastName"
                            value={values.lastName || ''}
                            style={{ width: '100%' }}
                            onChange={handleInputChange}
                            error={errors.lastName}
                        />
                       
                     
                    </div>
                    <div style={{ width: '45%' }}>
                        <Controls.Input
                            label="Email"
                            name="Email"
                            value={values.email || ''}
                            readOnly={true}
                            style={{ width: '100%' }}
                            onChange={handleInputChange}
                            error={errors.email}
                        />

                          <Controls.Select
                           name="roleId"
                           label="Roles"
                           value={recordForEdit.roleId || ""}
                          onChange={handleInputChange}
                          options={roles}
                         />
                        <Controls.Input
                            label="Phone Number"
                            name="phoneNumber"
                            style={{ width: '100%' }}
                            value={values.phoneNumber || ''}
                            onChange={handleInputChange}
                            error={errors.phoneNumber}
                        />

                    </div>
        
                </div>
         <div>
              <button style={{backgroundColor:"#333996"}} className='final-button'>Sign In <i className={store.getState().utilityReducer.buttonloader=== true ? "fa fa-spinner fa-spin" : ''}></i></button>
          </div>
            </Form>
        </div>

    )
}
