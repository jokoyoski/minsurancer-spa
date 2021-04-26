import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';


const returnables = () => ([
    { id: 'true', title: 'true' },
    { id: 'false', title: 'False' },
])


const initialFValues = {
    id: 0,
    categoryId: '',
    productName: '',
    unit: '',
    productDescription: '',
    sku: '',
    returnable: '',

}

export default function ProductForm(props) {
    const { addOrEdit, recordForEdit,categories } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('productName' in fieldValues)
            temp.productName = fieldValues.productName ? "" : "This field is required."
        if ('unit' in fieldValues)
            temp.unit = fieldValues.unit ? "" : "This unit is required."
        if ('sku' in fieldValues)
            temp.sku = fieldValues.sku ? "" : "This sku is required."
        if ('productDescription' in fieldValues)
            temp.productDescription = fieldValues.productDescription ? "" : "This productDescription is required."
        if ('categoryId' in fieldValues)
            temp.categoryId = fieldValues.categoryId !== "" ? "" : "Select a Category"
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
                        name="productName"
                        label="Product Name"
                        value={values.productName || ''}
                        onChange={handleInputChange}
                        error={errors.productName}
                    />
                    <Controls.Input
                        label="Product Description"
                        name="productDescription"
                        value={values.productDescription || ''}

                        onChange={handleInputChange}
                        error={errors.productDescription}
                    />
                    <Controls.Input
                        label="Unit"
                        name="unit"
                        value={values.unit || ''}
                        onChange={handleInputChange}
                        error={errors.unit}
                    />
                    <Controls.Input
                        label="SKU"
                        name="sku"
                        value={values.sku || ''}
                        onChange={handleInputChange}
                        error={errors.sku}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="categoryId"
                        label="Categories"
                        value={values.categoryId || ''}
                        onChange={handleInputChange}
                        options={categories}
                        error={errors.categoryId}
                    />

                    <Controls.Select
                        name="returnable"
                        label="Returnables"
                        value={values.returnable || ''}
                        onChange={handleInputChange}
                        options={returnables()}
                        error={errors.returnable}
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
