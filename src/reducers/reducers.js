import { combineReducers } from 'redux'

import appReducer  from './appReducers'

export default combineReducers({
    appStore: appReducer,
})