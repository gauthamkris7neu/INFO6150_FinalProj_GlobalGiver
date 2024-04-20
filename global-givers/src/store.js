import { createStore, combineReducers} from 'redux';
import loginReducer from './reducer/loginReducer';

const rootReducer = combineReducers({
    login: loginReducer
});

const store = createStore(rootReducer);

export default store;