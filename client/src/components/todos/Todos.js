import React from 'react';
import { connect } from 'react-redux';
import TodosTable from './TodosTable';


const Todos = (props) => (props.user && props.user.logged  && <TodosTable/>);

const mapStateToProps = ({user}) => ({user});

export default connect (mapStateToProps) (Todos);