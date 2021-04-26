import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';

const initialFValues = {
    id: 0,
    companyId: '',
    name: '',
    description: '',
}

export default function ProductCategoryForm(props) {
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        console.log(fieldValues)
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('descriptiob' in fieldValues)
            temp.description = fieldValues.description ? "" : "Field is required"
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
            console.log(values)
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
                        label="Name"
                        value={values.name || ''}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                   
                    <Controls.Input
                        label="Description"
                        name="description"
                        value={values.description || ''}
                        onChange={handleInputChange}
                        error={errors.description}
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
