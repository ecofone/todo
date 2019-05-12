import React, {Component} from 'react';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'; 


class NewTodo extends Component  {

    onSubmitNewTodo = (values) => {
        console.log("OnSubmitNewtodo: ", values);
        this.props.submitNewTodo(values,this.props.history);
    }

    render() { 
        return (
            <div>
                <NewTodoForm onSubmit={this.onSubmitNewTodo}/>
            </div>
        )
    }
}

export default connect(null,actions)(withRouter(NewTodo));