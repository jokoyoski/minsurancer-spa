import React, { useEffect,useState } from 'react'
import { Grid,Button } from '@material-ui/core';
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
    productDescription:''
    

}

export default function ProductForm(props) {
    const { addOrEdit, recordForEdit,categories } = props
    const [file, setFile] = useState(null)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('productName' in fieldValues)
            temp.productName = fieldValues.productName ? "" : "This field is required."
                  if ('productDescription' in fieldValues)
            temp.productDescription = fieldValues.productDescription ? "" : "This field is required."
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

    const selectFile = (event) => {
        setFile(event.target.files[0]);
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
            var data = { ...values, formFile: file }
            console.log(data)
            addOrEdit(data, resetForm);
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
                     <label style={{ marginLeft: '10px' }} htmlFor="btn-upload">
                        <input
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            onChange={selectFile} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span" >
                            Choose Image
                       </Button>
                    </label>
                    <Controls.Input
                        label="Product Price"
                        name="price"
                        value={values.price || ''}

                        onChange={handleInputChange}
                        error={errors.price}
                    />
                    {values.imageId && <img src={values.imageId} />}
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="categoryId"
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
