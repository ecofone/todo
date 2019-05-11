import React, {Component} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Notifications from './utilities/Notifications';
import NewUser from './NewUser';
import Todos from './todos/Todos';

function Landing (){
  return (
    <div>
      Landing Page
    </div>
  );
};

function TodoNew (){
  return (
    <div>
      New Todo
    </div>
  );
};


class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
              <Header/>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/todos" component={Todos}/>
              <Route exact path="/todos/new" component={TodoNew}/>
              <Route exact path="/users/new" component={NewUser}/>              
              <Notifications/>
            </BrowserRouter>
        );
    }
}

export default connect (null, actions) (App);
