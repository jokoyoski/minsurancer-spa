import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';




const initialFValues = {
    id: 0,
    subscriptionId: '',
    name: '',

}

export default function ServiceForm(props) {
    const { addOrEdit, recordForEdit,subscriptions } = props
    console.log(subscriptions)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('subscriptionId' in fieldValues)
            temp.subscriptionId = fieldValues.subscriptionId !== "" ? "" : "Select a Subscription"
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
            addOrEdit(values, resetForm);
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
                        name="name"
                        label="Service Name"
                        value={values.name || ''}
                        onChange={handleInputChange}
                        error={errors.name}
                    />


                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="subscriptionId"
                        label="Subscriptions"
                        value={values.subscriptionId || ''}
                        onChange={handleInputChange}
                        options={subscriptions}
                        error={errors.subscriptionId}
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
