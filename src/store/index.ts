import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


// reducers
import { profile_reducer } from './reducers/profile.reducer'



// app root reducer
const root_reducer = combineReducers({
    profile: profile_reducer,
})



const middleware = [thunk]

export default createStore(
    root_reducer,
    // initial state
    {},
    compose(
        composeWithDevTools(applyMiddleware(...middleware)),
    )
)