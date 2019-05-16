import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../actions';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    //width: 350,
  },
  inputLabel:{
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonGroup: {
    width: '100%', 
    'text-align': 'center'
  },
});

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'description',
    'dueDate'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (values['name'] && values['name'].length > 40) {
    errors['name'] = 'Name of the Todo must be less than 40 caracteres'
  }

  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)


const renderRadioButton = ({ input, ...rest }) => (
    <FormControl component="fieldset" {...input} {...rest}>
      <FormLabel component="legend">Status</FormLabel>
      <RadioGroup  {...input} {...rest}>
        <FormControlLabel value="open" control={<Radio />} label="Open" />
        <FormControlLabel value="delayed" control={<Radio />} label="Delayed" />
        <FormControlLabel value="closed" control={<Radio />} label="Closed" />
      </RadioGroup>
    </FormControl>
)

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} {...custom}>
    <FormLabel component="legend">{label}</FormLabel>
    <Select
      {...input}
      {...custom}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

class TodoForm extends Component  {

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  prepareUserList = () => {
    const {users} = this.props;
    const currentUser = this.props.user;
    if (users) {
      const userList = users.map( user => {
        if (user._id === currentUser.data._id ){
          return {_id: user._id, fullName: "Assign Me"};
        } else {
          return {_id: user._id, fullName: user.names + " " + user.lastName};
        }
      }).sort( (a,b) => {
        if (a.fullName > b.fullName) {
          return 1;
        }
        if (a.fullName < b.fullName) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return userList;
    }
    else {
      return null;
    }

  };

  render(){
    const { handleSubmit, pristine, reset, submitting, classes, operation, titleForm } = this.props;
    const userList = this.prepareUserList();
    return (
      <form className={classes.container} onSubmit={handleSubmit}>

          <Typography variant="title" gutterBottom>
            {titleForm}
          </Typography>
          <Field
            name="name"
            component={renderTextField}
            label="Name"
            className={classes.textField}
            fullWidth
          />
          <Field name="description" component={renderTextField} multiline label="description" fullWidth className={classes.textField}/>
          <InputLabel htmlFor="dueDate" className={classes.inputLabel}> Due Date</InputLabel>
          <Field name="dueDate" component={renderTextField} type="date" className={classes.textField}/>
          <Field name="status" component={renderRadioButton} className={classes.formControl}/>
          <Field
            className={classes.formControl}
            name="priority"
            label="Priority"
            component={renderSelectField}
          >
            <MenuItem key={1} value={'high'}>High</MenuItem>
            <MenuItem key={2} value={'medium'}>Medium</MenuItem>
            <MenuItem key={3} value={'low'}>Low</MenuItem>
          </Field>
          <Field
            className={classes.formControl}
            name="assignedTo"
            label="Assign To"
            component={renderSelectField}
          >
            {userList && userList.map(user => <MenuItem key={user._id} value={user._id}>{user.fullName}</MenuItem> )}
          </Field>
        <div className={classes.buttonGroup}>
          <Button component={Link} to="/todos" type="button" variant="contained" color="secondary" onClick={reset} className={classes.button}>
            Cancel
          </Button>
          <Button type="button" variant="contained" disabled={pristine || submitting} onClick={reset} className={classes.button}>
            Clear Values
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={pristine || submitting} className={classes.button}>
            Submit
          </Button>
        </div>
      </form>
    )
  }
};

 
const mapStateToProps = ({user, users}) => ({user, users});

export default connect(mapStateToProps, actions)
(reduxForm({
  form: 'TodoForm', // a unique identifier for this form
  validate,
  enableReinitialize : true // this is needed!!
})(withStyles(styles)(TodoForm)));



TodoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  operation: PropTypes.oneOf(['New', 'Edit']).isRequired,
  titleForm: PropTypes.string.isRequired,
  todo: PropTypes.object,
};
