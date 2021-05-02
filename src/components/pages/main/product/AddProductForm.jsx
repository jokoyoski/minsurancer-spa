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
    productCategoryId: '',
    productName: '',
    price: '',
    

}

export default function AddProductForm(props) {
    const { addOrEdit, recordForEdit,categories } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('productName' in fieldValues)
            temp.productName = fieldValues.productName ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This price is required."
        if ('productCategoryId' in fieldValues)
            temp.productCategoryId = fieldValues.productCategoryId !== "" ? "" : "Select a Category"
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
                        label="Product Price"
                        name="price"
                        value={values.price || ''}

                        onChange={handleInputChange}
                        error={errors.price}
                    />
                    

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="productCategoryId"
                        label="Categories"
                        value={values.productCategoryId || ''}
                        onChange={handleInputChange}
                        options={categories}
                        error={errors.categoryId}
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
