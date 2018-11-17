import React from 'react'

export const FormFieldInput = ({ field, form: { values, touched, errors, dirty, isSubmitting }, type, label, ...props}) => (
    <div>
        <label>
            {label}
        </label>
        <input type={type} {...field} {...props}/>
    </div>
)