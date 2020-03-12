import {combineReducers} from "redux";
import listingsReducer from './listings'
import miscReducer from './misc'

const rootReducer = combineReducers({
    listings: listingsReducer,
    misc: miscReducer
})

export default rootReducer