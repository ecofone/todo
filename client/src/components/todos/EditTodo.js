import React, {Component} from 'react';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'; 


class EditTodo extends Component  {

    onSubmitEditTodo = (values) => {
        this.props.submitEditTodo(values,this.props.history);
    }

    render() { 
        if (this.props.currentTodo){
            const currentTodo = this.props.currentTodo;
            currentTodo.assignedTo = this.props.currentTodo.assignedTo._id;
            return (
                <div>
                    <TodoForm onSubmit={this.onSubmitEditTodo} 
                    initialValues={currentTodo} 
                    operation='Edit' 
                    titleForm={`Editing TODO ${this.props.currentTodo._id}`}/>
                </div>
            )
        }
        else {
            return null;
        }
    }
}   

const mapStateToProps = ({currentTodo}) => ({currentTodo});

export default connect(mapStateToProps,actions)(withRouter(EditTodo));