import React from 'react'
import './util.css'

export const FormFieldInput = ({ field, form: { values, touched, errors, dirty, isSubmitting }, type, label, ...props}) => (
    <div className='form-field'>
        <label className='form-field-label'>
            {label}
        </label>
        <input 
        className='form-field-input'
        type={type} 
        {...field} 
        {...props}
        />
    </div>
)