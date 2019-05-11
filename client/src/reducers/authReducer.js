import { FETCH_USER, LOGIN, CANCEL_LOGIN } from '../actions/types';


export default function (state = null, action) {
    switch ( action.type) {
        case FETCH_USER:
            return action.payload.user;
        case LOGIN:
            return action.payload.user;
        case CANCEL_LOGIN:
            return action.payload.user;
        default:
            return state;
    }
}