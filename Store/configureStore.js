import { createStore, combineReducers } from 'redux'
import toogleFavorite from './Reducers/favoriteReducer'
import changeAvatar from './Reducers/avatarReducer'


const reducers = combineReducers({
    toogleFavorite,
    changeAvatar
})
export default createStore(reducers)