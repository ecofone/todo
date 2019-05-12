import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
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
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: 'age',
        id: 'age-native-simple'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

class NewTodoForm extends Component  {

  render(){
    const { handleSubmit, pristine, reset, submitting, classes } = this.props
    return (
      <form className={classes.container} onSubmit={handleSubmit}>

          <Typography variant="title" gutterBottom>
            Creation of New TODO
          </Typography>
          <Field
            name="name"
            component={renderTextField}
            label="Name"
            className={classes.textField}
            fullWidth
          />
          <Field name="description" component={renderTextField} multiline label="description" fullWidth className={classes.textField}/>
          <InputLabel htmlFor="dueDate" className={classes.inputLabel}>dueDate</InputLabel>
          <Field name="dueDate" component={renderTextField} type="date" fullWidth className={classes.textField}/>
        <div>
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

export default 
  reduxForm({
    form: 'NewTodoForm', // a unique identifier for this form
    validate
})(withStyles(styles)(NewTodoForm));


NewTodoForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
