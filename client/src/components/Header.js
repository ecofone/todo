import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from './Login';
import * as actions from '../actions';


const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class Header extends Component {

    logOut(){
        this.props.logout();
    }

    renderUserInfo(){
        if (this.props.user){
            const {logged, data} = this.props.user;
            if (!logged){
                return (
                    <div>
                        <Login/>
                        <Button 
                            component={Link}
                            to="/users/new"
                            color="inherit">
                            Sign Up
                        </Button>   
                    </div>
                );
            }
            else {
                return (
                    <div>
                        Hola, {data.names}
                        <Button color="inherit" onClick={()=>this.logOut()}>
                            Log Out
                        </Button>
                    </div>
                );

            } 
        }
        return null;
    }

    render () {
        const { classes, user } = this.props;
        return (
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} component={Link} 
                                to={user && user.logged ? "/todos" : "/"} 
                                color="inherit" aria-label="Menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        TODOs
                    </Typography>
                    {this.renderUserInfo()}
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({user}) => ({user});

export default withRouter (connect(mapStateToProps, actions) (withStyles(styles)(Header)));  

