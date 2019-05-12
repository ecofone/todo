import React from 'react';
import { connect } from 'react-redux';
import TodosTable from './TodosTable';
import ButtonFloat from '../utilities/ButtonFloat';
import { Link } from 'react-router-dom';



const Todos = (props) => {
    return(
        <div>
            { props.user && props.user.logged  && <TodosTable/> }
            <ButtonFloat component={Link} to="/todos/new"/>
        </div>
    );
};

const mapStateToProps = ({user}) => ({user});

export default connect (mapStateToProps) (Todos);