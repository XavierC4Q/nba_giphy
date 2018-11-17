import React from 'react'
import { Formik, Field } from 'formik'
import { default as actions } from '../../actions/index'
import { connect } from 'react-redux'
import { FormFieldInput } from '../../util/formField'

const mapStateToProps = (state) => {
    return {
        results: state.giphy.requestedGifs,
        loggedInUser: state.user.loggedInUser,
        gifs: state.giphy.requestedGifs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearch: (query, limit) => dispatch(actions.searchGifs(query, limit))
    }
}

const Search = ({ results, loggedInUser, gifs, handleSearch }) => {
    return (
        <div>
            <Formik
            initialValues={{
                query: '',
                amount: '',
                limits: ['', 10, 20, 50]
            }}
            onSubmit={(values, actions) => {
                const { query, amount } = values
                const limit = amount || 10
                actions.setSubmitting(false)
                handleSearch(query, limit)
            }}
            render={props => {
                const {
                    values,
                    handleBlur,
                    handleChange,
                    handleSubmit
                } = props
                return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1>SEARCHING</h1>
                        <Field type='text' name='query' label='What are your searching for?' component={FormFieldInput}/>
                        <select name='amount' onChange={handleChange} onBlur={handleBlur}>
                            {values.limits.map((limit) => (
                                <option key={limit} name='amount' value={limit}>{limit}</option>
                            ))}
                        </select>
                        <button type='submit'>Search</button>
                        <div>
                            {gifs.map((gif) => (
                                <div>
                                    <img src={gif.url} width={gif.width} height={gif.height}/>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            )}}/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)