import {LOGIN, LOGOUT} from '../actions/loginActions';

const initialState = {
    loggedIn: false,
    user: null
};

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: null
            };
        default:
            return state;        
    }
};

export default loginReducer;