import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label,readonly ,style,value,error=null, onChange,type, ...other} = props;
    return (
      
        <TextField
            variant="outlined"
            label={label}
            name={name}
            style={style}
            value={value}
            readOnly={readonly}
            type={type}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
