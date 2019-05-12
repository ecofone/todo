import axios from 'axios';

import { FETCH_USER, LOGIN, CANCEL_LOGIN, FETCH_TODOS, FETCH_TODOS_ERROR, NEW_TODO, NEW_TODO_ERROR} from './types';

//Fetch user data
export const fetchUser = () => async (dispatch,getState) =>  
{   
    const state = getState();
    console.log("FetchUser: ", state); 
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
        console.log("Error calling API New Todo: ", error);
        dispatch({type: NEW_TODO_ERROR, 
            payload:{   
                    messages: [{msgType:"error", desc: "Error Creating a new Todo. Try Again!" }]
                    }
        });
    }
};





