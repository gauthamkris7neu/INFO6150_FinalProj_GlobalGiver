import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './reducer/loginReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login'] 
};

const rootReducer = combineReducers({
    login: loginReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };