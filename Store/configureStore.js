import { createStore, combineReducers } from 'redux'
import toogleFavorite from './Reducers/favoriteReducer'
import changeAvatar from './Reducers/avatarReducer'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const reducers = combineReducers({
    toogleFavorite,
    changeAvatar
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


export default createStore(persistedReducer)