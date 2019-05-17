import React, {Component} from 'react';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'; 


class NewTodo extends Component  {

    onSubmitNewTodo = (values) => {
        this.props.submitNewTodo(values,this.props.history);
    }

    render() { 
        return (
            <div>
                <TodoForm onSubmit={this.onSubmitNewTodo} operation='New' 
                titleForm='Creating a new TODO'/>
            </div>
        )
    }
}

export default connect(null,actions)(withRouter(NewTodo));