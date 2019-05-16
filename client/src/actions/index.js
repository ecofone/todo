import axios from 'axios';

import { FETCH_USER, LOGIN, CANCEL_LOGIN, 
        FETCH_TODOS, FETCH_TODOS_ERROR, 
        NEW_TODO, NEW_TODO_ERROR,
        EDIT_TODO, SUBMIT_EDIT_TODO,
        SUBMIT_EDIT_TODO_ERROR, GET_ALL_USERS } from './types';

//Fetch user data
export const fetchUser = () => async (dispatch,getState) =>  
{   
    const state = getState();
    const res = await axios.get('/auth/current_user');
    var logged = true;

    if (!res.data){
        logged = false;
    }
    dispatch({  type: FETCH_USER, 
                payload:{   
                        user: {logged, errorLogin: false, data:res.data}
                }
            });
}

// Fet all users data
export const fetchAllUsers = () => async (dispatch,getState) =>  
{   
    const {users} = getState();
    if (!users) {
        const res = await axios.get('/auth/users');
        dispatch({  type: GET_ALL_USERS, 
                    payload: res.data
                });
    }
}

//LOGOUT
export const logout = () => async dispatch =>  
{   
    await axios.get('/auth/logout');
    dispatch({type: FETCH_USER, 
        payload:{   
            user: {logged: false, errorLogin: false, data: {}}  
        }
    });
}

//LOGIN
export const login = (userCred, history) => async dispatch => 
{
    try {
        const res = await axios.post('/auth/login', userCred);
        history.push('/todos');
        dispatch({  type: LOGIN, 
                    payload:{   
                            user: {logged: true, errorLogin: false, data:res.data}, 
                            messages: [{msgType:"success", desc: "Sucessfully Logged In!"}]
                            }
                });
    } catch (error) {
        dispatch({  type: LOGIN, 
            payload:{   
                    user: {logged: false, errorLogin: true},
                    messages: []
                    }
        });

    }
}

//CANCEL LOGIN
export const cancelLogin = () => (
        {type: CANCEL_LOGIN, payload: {user: {logged: false, errorLogin: false}}}
    );


//Submit new User 
export const submitNewUser = (user, history) => async dispatch => 
{
    try{
        const res = await axios.post('/auth/create', user);
        history.push('/todos');
        dispatch({ type: FETCH_USER, 
                payload:{   
                    user: {logged: true, errorLogin: false, data:res.data}, 
                    messages: [{msgType:"success", desc: "Sucessfully Logged In!"}]
                    }
        });
    } catch (error) {
        dispatch({type: LOGIN, 
            payload:{   
                    user: {logged: false, errorLogin: true},
                    messages: [{msgType:"error", desc: error.response.data}]
                    }
        });
    }
};

//Fetch Todos
export const fetchTodos = () => async dispatch =>  
{   

    try{ 
        const res = await axios.get('/api/todo');
        dispatch({  type: FETCH_TODOS, 
                    payload: res.data
                });
    } catch (error) {
        dispatch({type: FETCH_TODOS_ERROR, 
            payload:{   
                    messages: [{msgType:"error", desc: error.response.data}]
                    }
        });
    }
}


//New Todo

//Submit new Todo
export const submitNewTodo = (todo, history) => async dispatch => 
{
    try{
        const res = await axios.post('/api/todo/create', todo);
        history.push('/todos');
        dispatch({ type: NEW_TODO, 
                payload:{  
                    todo: res.data, 
                    messages: [{msgType:"success", desc: "Now Todo Created!"}]
                    }
        });
    } catch (error) {
        dispatch({type: NEW_TODO_ERROR, 
            payload:{   
                    messages: [{msgType:"error", desc: "Error Creating a new Todo. Try Again!" }]
                    }
        });
    }
};

//Edit TODO
export const editTodo = (todo, history) => {
    history.push('/todos/edit');
    return {
        type: EDIT_TODO,
        payload: todo
    };
};

//Submit Edit Todo
export const submitEditTodo = (todo, history) => async dispatch => 
{
    try{
        const editPath = '/api/todo/edit/'+ todo._id;
        const res = await axios.post(editPath, todo);
        history.push('/todos');
        dispatch({ type: SUBMIT_EDIT_TODO, 
                payload:{  
                    todo: res.data, 
                    messages: [{msgType:"success", desc: "Todo sucessfully Updated !"}]
                    }
        });
    } catch (error) {
        dispatch({type: SUBMIT_EDIT_TODO_ERROR, 
            payload:{   
                    messages: [{msgType:"error", desc: "Error Updating new Todo. Try Again!" }]
                    }
        });
    }
};





