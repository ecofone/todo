import { combineReducers} from 'redux';
import authReducer from './authReducer';
import msgReducer from './msgReducer';
import todoReducer from './todoReducer';
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
    user: authReducer,
    todos: todoReducer,
    messages: msgReducer,
    form: formReducer
});