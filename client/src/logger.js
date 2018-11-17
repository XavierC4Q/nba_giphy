export const logger = ({ dispatch, getState }) => next => action => {
    let currentAction = next(action)
    console.log('LAST ACTION TO BE DISPATCHED: ', currentAction.type)
    console.log('THE PAYLOAD OF LAST ACTION: ', currentAction.payload)
    let state = getState()
    console.log('***** THE STORE *****')
    Object.keys(state).forEach(key => {
        console.log(`***** ${key.toUpperCase()} *****`)
        console.table(state[key])
    })
}