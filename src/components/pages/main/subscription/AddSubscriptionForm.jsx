import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';


const initialFValues = {
    id: 0,
    planName: '',
    amount:'',

}

export default function AddSubscriptionForm(props) {
    const { addsubscription, recordForEdit, cacNumber, userType } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('planName' in fieldValues)
            temp.planName = fieldValues.planName ? "" : "This field is required."
        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount ? "" : "This field is required."
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
            addsubscription(values, resetForm);
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
                        name="planName"
                        label="planName"
                        value={values.planName || ''}
                        onChange={handleInputChange}
                        error={errors.planName}
                    />
                    <Controls.Input
                        name="amount"
                        label="Amount"
                        value={values.amount || ''}
                        onChange={handleInputChange}
                        error={errors.amount}
                    />
                </Grid>
                <Grid item xs={6}>
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
