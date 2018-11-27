import React from 'react'
import { Formik, Field } from 'formik'
import { default as actions } from '../../actions/index'
import { connect } from 'react-redux'
import { FormFieldInput } from '../../util/formField'
import './search.css'

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
        <div className='search-wrapper'>
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
                <div className='form-wrapper'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <Field type='text' name='query' label='Search for player or team' component={FormFieldInput}/>
                        <select className='search-select' name='amount' onChange={handleChange} onBlur={handleBlur}>
                            {values.limits.map((limit) => (
                                <option key={limit} name='amount' value={limit}>{limit}</option>
                            ))}
                        </select>
                        <button className='search-button' type='submit'>Search</button>
                    </form>
                    <div>
                        {gifs.map((gif) => (
                            <div>
                                <img src={gif.url} width={gif.width} height={gif.height}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}}/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)