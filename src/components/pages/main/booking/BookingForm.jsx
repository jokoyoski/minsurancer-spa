import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';
import Select from '@material-ui/core/Select';
import { store } from '../../../../redux-store/store';



const initialFValues = {
    id: 0,
    plateNumber: '',
    firstName: '',
    statusName: '',
    serviceName: '',
    addtionalInfo: '',
    transactionReference: '',
    location:'',
    statusId: 0,
    email :'',
    phoneNumber:'',
    dateCreated: new Date(),
}

export default function BookingForm(props) {
    const {recordForEdit,statuses ,setOpenPopup} = props
    const validate = (fieldValues = values) => {}

    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true,validate);

    const handleSubmit = e => {
        e.preventDefault()
        var data={
            transactionReference:values.transactionReference,
            statusId :values.statusId
        }
        store.dispatch({ type: "UPDATE_BOOKING",payload:data })
        setOpenPopup(false)
      
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
                        name="plateNumber"
                        label="Plate Number"
                        value={values.plateNumber || ''}
                        readOnly={true}
                        onChange={handleInputChange}
        
                    />
                    <Controls.Input
                        label="First Name"
                        name="firstName"
                        value={values.firstName || ''}
                        readOnly={true}
                        onChange={handleInputChange}
                    
                    />
                    <Controls.Input
                        label="Service Name"
                        name="serviceName"
                        readOnly={true}
                        value={values.serviceName || ''}
                        onChange={handleInputChange}
                      
                    />
                      <Controls.Input
                        label="Location"
                        name="location"
                        readOnly={true}
                        value={values.location || ''}
                        onChange={handleInputChange}
                      
                    />
                      <Controls.Input
                        label="Transaction Reference"
                        name="transactionReference"
                        readOnly={true}
                        value={values.transactionReference || ''}
                        onChange={handleInputChange}

                        
                      
                    />
                      <Controls.Input
                        label="Email"
                        name="email"
                        readOnly={true}
                        value={values.email || ''}
                        onChange={handleInputChange}
                    />
                      <Controls.Input
                        label="Phone Number"
                        name="phoneNumber"
                        readOnly={true}
                        value={values.phoneNumber || ''}
                        onChange={handleInputChange}

                
                    />
                    <Controls.Input
                        label="Additional Info"
                        readOnly={true}
                        name="addtionalInfo"
                        readOnly={true}
                        value={values.additionalInfo || ''}
                        onChange={handleInputChange}
                     
                    />
                    
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="statusId"
                        label="Status"
                        value={values.statusId || ''}
                        onChange={handleInputChange}
                        options={statuses}
                      
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
