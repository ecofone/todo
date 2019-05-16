import { EDIT_TODO, SUBMIT_EDIT_TODO } from '../actions/types';


export default function (state = null, action) {
    switch ( action.type) {
        case EDIT_TODO:
            return action.payload;
        case SUBMIT_EDIT_TODO:
        return null;
        default:
            return state;
    }
}