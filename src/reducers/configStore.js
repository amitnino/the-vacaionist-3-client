import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authReducer';
import vacationsReducer from './vacationsReducer';
import alertReducer from './alertReducer';
import searchReducer from './searchReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = {
    authReducer: persistReducer(persistConfig, authReducer),
    vacationsReducer,
    alertReducer,
    searchReducer
}

export const store = createStore(combineReducers(reducers))
export const persistor = persistStore(store)