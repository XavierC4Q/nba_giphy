import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { default as actions } from '../../actions/index'
import { FormFieldInput } from '../../util/formField'

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
        authError: state.user.error
    }
}

const Login = props => {
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
                <h2>LOGIN FORM</h2>
                <form onSubmit={handleSubmit}>
                <Field type='text' component={FormFieldInput} name='username' label='Username'/>
                <Field type='text' component={FormFieldInput} name='password' label='Password'/>
                <button 
                type='submit' 
                disabled={isSubmitting} 
                >SUBMITTER</button>
                </form>
                <div>{props.authError ? <p>{props.authError}</p> : ''}</div>
            </div>
        )
}

const EnhancedLoginForm = connect(mapStateToProps, null)(withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long')
            .max(13, 'Password should be shorter than 13 characters')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        const { username, password } = values 
        setSubmitting(false)
        props.dispatch(actions.loginUser(username, password))
    },
    displayName: 'Login Form'
})(Login))

export default EnhancedLoginForm