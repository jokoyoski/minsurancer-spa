import React, { useEffect,useState } from 'react'
import { Grid,Button } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';


const initialFValues = {
    id: 0,
    conpanyId: '',
    name: '',
    description: '',
}

export default function AddProductCategoryForm(props) {
    const [file, setFile] = useState(null)
    const { addProductCategory, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "Field is required"
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
            addProductCategory(data, resetForm);
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
