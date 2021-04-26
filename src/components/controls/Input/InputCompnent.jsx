import React from 'react'

export const InputCompnent = (props) => {
    return (
        <div className='form__group'>
            <label className='required' style={{color:'black',fontSize:'0.7rem'}} htmlFor={props.id}>{props.label}</label>
            <input type={props.type ||'text'} name={props.name} id={props.id} autoComplete="off"
             value={props.value}
             
             onChange={props.onChange}
             style={{backgroundColor:'white', border:'1px solid #D2D9FF',fontSize:'0.7rem'}}
             placeholder={props.placeholder}
             className={props.error ? 'error' :''}
             />
             {props.error && <div className="form__error">{props.error}</div>}
        </div>
    )
}

export default InputCompnent