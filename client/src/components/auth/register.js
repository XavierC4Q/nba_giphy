import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, withFormik } from 'formik'
import { default as actions } from '../../actions/index'
import { FormFieldInput } from '../../util/formField'
import * as Yup from 'yup'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
        authError: state.user.error
    }
}

const Register = props => {
        const {
            handleSubmit,
            handleChange,
            handleBlur,
            handleReset,
            isSubmitting,
            submitForm,
            values,
            errors,
            dirty,
            touched,
            loggedInUser
        } = props
    
        if(loggedInUser){
            const path = `/profile/${loggedInUser.username}`
            return (<Redirect to={path}/>)
        }
        return (
            <div>
                <h2>REGISTER FORM</h2>
                <form onSubmit={handleSubmit}>
                <Field type='text' component={FormFieldInput} name='username' label='Username'/>
                {errors.username ? <div>{errors.username}</div> : ''}
                <Field type='text' component={FormFieldInput} name='password' label='Password'/>
                {errors.password ? <div>{errors.password}</div> : ''}
                <Field type='text' component={FormFieldInput} name='confirmPassword' label='Confirm Password'/>
                {errors.confirmPassword ? <div>{errors.confirmPassword}</div> : ''}
                <Field type='text' component={FormFieldInput} name='email' label='Email'/>
                {errors.email ? <div>{errors.email}</div> : ''}
                <Field type='text' component={FormFieldInput} name='confirmEmail' label='Confirm Email'/>
                {errors.confirmEmail ? <div>{errors.confirmEmail}</div> : ''}
                <button 
                type='submit' 
                disabled={isSubmitting} 
                >SUBMIT</button>
                </form>
                <div>{this.props.authError ? <p>{this.props.authError}</p> : ''}</div>
            </div>
        )
}

Yup.addMethod(Yup.mixed, 'equalTo', function(ref, message) {
    const msg = message || ``;
    return this.test('equalTo', msg, function (value) {
      let refValue = this.resolve(ref);
      return !refValue || !value || value === refValue;
    })
})

const EnhancedRegisterForm = connect(mapStateToProps, null)(withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        confirmEmail: ''
    }),
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Usrename cannot be longer than 20 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 charcaters long')
            .max(20, 'Password cannot be longer than 20 characters')
            .equalTo(Yup.ref('confirmPassword')),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid')
            .equalTo(Yup.ref('confirmEmail')),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .min(6, 'Confirm Password must be at least 6 charcaters long')
            .max(20, 'Confirm Password cannot be longer than 20 characters')
            .equalTo(Yup.ref('password'), 'Confirm password must match password'),
        confirmEmail: Yup.string()
            .required('Confirm Email is required')
            .email('Confirm Email is invalid')
            .equalTo(Yup.ref('email'), 'Confirm email must match email')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        const { username, password, email, confirmEmail, confirmPassword } = values
        setSubmitting(false)
        props.dispatch(actions.registerUser(username, password, email, confirmPassword, confirmEmail))
    },
    displayName: 'Register Form'
})(Register))

export default EnhancedRegisterForm