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


}



export default function AddProductForm(props) {
    const { addOrEdit, recordForEdit, categories } = props
    const [file, setFile] = useState(null)
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
            var data = { ...values, formFile: file }
            console.log(data)
            addOrEdit(data, resetForm);
        }
    }
    var fileRecord = null;
    var state = {
        currentFile: undefined,
        previewImage: undefined,
        progress: 0,

        message: "",
        isError: false,
        imageInfos: [],
    };

    const selectFile = (event) => {
        setFile(event.target.files[0]);
        
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
