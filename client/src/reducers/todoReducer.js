import { FETCH_TODOS, NEW_TODO } from '../actions/types';


export default function (state = null, action) {
    switch ( action.type) {
        case FETCH_TODOS:
            return action.payload;
        case NEW_TODO: 
            return [...state, action.payload.todo]
        default:
            return state;
    }
}