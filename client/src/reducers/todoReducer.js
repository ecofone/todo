import { FETCH_TODOS, NEW_TODO, SUBMIT_EDIT_TODO } from '../actions/types';


export default function (state = null, action) {
    switch ( action.type) {
        case FETCH_TODOS:
            return action.payload;
        case NEW_TODO: 
            return [...state, action.payload.todo]
        case SUBMIT_EDIT_TODO:
            return [
                ...state.filter(todo => todo._id !== action.payload.todo._id),
                action.payload.todo
            ]
        default:
            return state;
    }
}