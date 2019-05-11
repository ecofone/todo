import React, {Component} from 'react';
import NewUserForm from './NewUserForm';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom'; 


class NewUser extends Component  {

    onSubmitNewUser = (values) => {
        this.props.submitNewUser(values,this.props.history);
    }

    render() { 
        return (
            <div>
                <NewUserForm onSubmit={this.onSubmitNewUser}/>
            </div>
        )
    }
}

export default connect(null,actions)(withRouter(NewUser));
