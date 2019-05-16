import { combineReducers} from 'redux';
import authReducer from './authReducer';
import msgReducer from './msgReducer';
import todoReducer from './todoReducer';
import usersReducer from './usersReducer';
import currentTodoReducer from './currentTodoReducer';
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
    user: authReducer,
    todos: todoReducer,
    currentTodo: currentTodoReducer,
    messages: msgReducer,
    form: formReducer,
    users: usersReducer
});