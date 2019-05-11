import React from 'react';
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
    //display: 'flex',
    //flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350,
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
    'names',
    'lastName',
    'email',
    'username',
    'password',
    'repassword'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (values.password && values.repassword) {

    if (values.password !== values.repassword) {
        errors.password = 'Passwords do not match';
        errors.repassword = 'Passwords do not match';
    }
    else if (values.password && values.password.length <8 ) {
        errors.password = 'Password Length must be more than 8 characteres';
    }
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

const NewUserForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props
  return (
    <form className={classes.container} onSubmit={handleSubmit}>

        <Typography variant="title" gutterBottom>
          Creation of new User
        </Typography>
        <Field
          name="names"
          component={renderTextField}
          label="Names"
          className={classes.textField}
          fullWidth
        />
        <Field name="lastName" component={renderTextField} label="Last Name" fullWidth className={classes.textField}/>
        <Field name="email" component={renderTextField} label="Email" type="email" fullWidth className={classes.textField}/>
        <Field name="username" component={renderTextField} label="Username" fullWidth className={classes.textField}/>
        <Field name="password" component={renderTextField} label="Password" type="password" fullWidth className={classes.textField}/>
        <Field name="repassword" component={renderTextField} label="Re Enter Password" type="password" fullWidth className={classes.textField}/>
      <div>
        <Button component={Link} to="/" type="button" variant="contained" color="secondary" onClick={reset} className={classes.button}>
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
};

export default reduxForm({
  form: 'NewUserForm', // a unique identifier for this form
  validate
})(withStyles(styles)(NewUserForm));


NewUserForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
