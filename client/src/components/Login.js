import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import * as actions from '../actions';
import loginGoogleIcon from '../img/sign_with_google.png';
import { withRouter } from 'react-router-dom'; 


class Login extends Component {

    constructor(){
        super();
        this.state = {
            open: false,
            user: {
                username: "", 
                password: ""
            },
            errorUsername: "",
            errorPassword: "",
        };
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
            errorUsername: "",
            errorPassword: ""
        });
    };
    
    handleClose = () => {
        this.setState({open: false});
        if (!this.props.user.logged){
            this.props.cancelLogin();
        }
    };

    handleUsernameChange = (event) =>  {
        var errorUsername = "";
        const username = event.target.value;
        if (username === ""){
            errorUsername = "username is required";
        }
        this.setState({errorUsername, user: {...this.state.user, username}});
    };


    handlePasswordChange = (event) => {
        var errorPassword = "";
        const password = event.target.value;
        if (password === ""){
            errorPassword = "password is required";
        }
        this.setState({errorPassword, user: {...this.state.user, password}});
    };

    isValid = () => {
        return (this.state.errorUsername === "" && this.state.errorPassword === "");
    };

    onSubmit = () => {
        this.props.login(this.state.user,this.props.history);
    };


    render() {
        const {logged, errorLogin} = this.props.user;
        return (
            <React.Fragment>
               <Button color="inherit" onClick={this.handleClickOpen}>
                 Login
                </Button>
                <Dialog
                    //If user is logged in close the modal
                    open={!logged && this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your username and password to Login
                    </DialogContentText>
                    <TextField
                        autoFocus
                        error={this.state.errorUsername!==""}
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        helperText={this.state.errorUsername}
                        value={this.state.user.username} 
                        onChange={this.handleUsernameChange}
                    />
                    <TextField
                        error={this.state.errorPassword!==""}
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        helperText={this.state.errorPassword}
                        value={this.state.user.password} 
                        onChange={this.handlePasswordChange}
                    />
                    { errorLogin && 
                    (
                        <Typography color='error'>
                            Login or Password incorrect. Try again!
                        </Typography>  
                    )
                    } 
                    <br/><br/><hr/>
                    <DialogContentText>
                        or Sign In with your favorite Social Network
                    </DialogContentText>
                    <br/>
                    <a href='/auth/google'>
                        <img src={loginGoogleIcon} alt={"Login with Google"} height="48" width="150"/>
                    </a>
                    <br/>
  
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>this.handleClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>this.onSubmit()} color="primary">
                    Login
                </Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        );
    };
};

const mapStateToProps = ({user}) => ({user});

export default connect (mapStateToProps, actions) (withRouter(Login));
