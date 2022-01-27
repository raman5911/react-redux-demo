import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { postUser } from "../actions/fetchAndPostUserAction";

// MUI dependencies module
import {
  Button,
  Grid,
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  Snackbar
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// MUI date picker
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//functions for input field validation

import {
  nameValidation,
  emailValidation,
  phoneNumberValidation,
  genderValidation,
  locationValidation,
} from "../validation";

function Form() {

  //code for displaying a notification on successfull form submission
  const [openSnackbarState, setOpenSnackbarState] = useState(false);

  const handleClick = () => {
    setOpenSnackbarState(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbarState(false);
  };

  //Getting state from redux store

  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.usersReducer.newUser);

  //state for controlling input field values
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    joinDate: new Date(),
    reportTime: new Date(),
    location: "",
  });

  const [checked, setChecked] = useState(false);

  // state for input fields validation

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [otherFieldsError, setOtherFieldsError] = useState({
    gender: false,
    location: false,
    checkbox: false,
  });

  //handling on change events on input fields

  function handleChange(e) {
    const inputFieldName = e.target.name;
    const inputFieldValue = e.target.value;

    setValue((prevState) => {
      return {
        ...prevState,
        [inputFieldName]: inputFieldValue,
      };
    });
  }

  const handleDateChange = (date) => {
    setValue((prevState) => {
      return {
        ...prevState,
        joinDate: date,
      };
    });
  };

  const handleTimeChange = (time) => {
    setValue((prevState) => {
      return {
        ...prevState,
        reportTime: time,
      };
    });
  };

  //validating all the inputs

  function inputValidation() {
    //name validation
    if (!nameValidation(value.fullName)) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    //email validation
    if (!emailValidation(value.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    //phone number validation
    if (!phoneNumberValidation(value.phoneNumber)) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }

    //gender validation
    if (!genderValidation(value.gender)) {
      setOtherFieldsError((prevState) => {
        return {
          ...prevState,
          gender: true,
        };
      });
    } else {
      setOtherFieldsError((prevState) => {
        return {
          ...prevState,
          gender: false,
        };
      });
    }

    //location validation
    if (!locationValidation(value.location)) {
      setOtherFieldsError((prevState) => {
        return {
          ...prevState,
          location: true,
        };
      });
    } else {
      setOtherFieldsError((prevState) => {
        return {
          ...prevState,
          location: false,
        };
      });
    }

    //checkbox validation
    if (!checked) {
      setOtherFieldsError((prevState) => {
        return {
          ...prevState,
          checkbox: true,
        };
      });
    } else {
      setOtherFieldsError((prevState) => {
        return {
          ...prevState,
          checkbox: false,
        };
      });
    }

    if (
      nameError ||
      emailError ||
      otherFieldsError.gender ||
      otherFieldsError.location ||
      !checked
    ) {
      return false;
    }

    return true;
  }

  //handling form submission

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValidation() === true) {
      console.log(value);
      dispatch(postUser(value));
      console.log(newUser);
      handleClick();
    }
  }

  return (
    <Container maxWidth="lg" minWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item className="item" xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={value.name}
              onChange={handleChange}
              fullWidth
            />
            {nameError === true ? (
              <Alert severity="error" style={{ marginTop: "0.5rem" }}>
                <AlertTitle className="alert-title">Error</AlertTitle>Invalid
                Name!
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item className="item" xs={12} sm={6}>
            <TextField
              type="email"
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              name="email"
              value={value.email}
              onChange={handleChange}
              fullWidth
            />
            {emailError === true ? (
              <Alert severity="error" style={{ marginTop: "0.5rem" }}>
                <AlertTitle className="alert-title">Error</AlertTitle>Invalid
                Email!
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item className="item" xs={12} sm={6}>
            <TextField
              type="tel"
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={value.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
            {phoneNumberError === true ? (
              <Alert severity="error" style={{ marginTop: "0.5rem" }}>
                <AlertTitle className="alert-title">Error</AlertTitle>Invalid
                Phone number!
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item className="item" xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className="radio-label">
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={value.gender}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio size="small" />}
                  label="Female"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio size="small" />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            {otherFieldsError.gender === true ? (
              <Alert severity="error" style={{ marginTop: "0.5rem" }}>
                <AlertTitle className="alert-title">Error</AlertTitle>This field
                is required!
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid
            container
            className="date-wrapper"
            alignItems="center"
            justify="center"
            direction="row"
          >
            <Grid item xs={6} sm={3}>
              <DatePicker
                value={value.joinDate}
                onChange={handleDateChange}
                label="Date Of Joining"
                name="joinDate"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TimePicker
                value={value.reportTime}
                onChange={handleTimeChange}
                label="Reporting Time"
                name="reportTime"
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid container>
          <Grid item className="item" xs={12} sm={6}>
            <FormControl className="select">
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="location"
                value={value.location}
                onChange={handleChange}
              >
                <MenuItem value={"Gurugram"}>Gurugram</MenuItem>
                <MenuItem value={"Noida"}>Noida</MenuItem>
                <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
              </Select>
            </FormControl>
            {otherFieldsError.location === true ? (
              <Alert severity="error" style={{ marginTop: "0.5rem" }}>
                <AlertTitle className="alert-title">Error</AlertTitle>This field
                is required!
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item className="item" xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => {
                    var newCheckedState = !checked;
                    setChecked(newCheckedState);
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Submit my data"
            />
            {otherFieldsError.checkbox === true ? (
              <Alert severity="error" style={{ marginTop: "0.5rem" }}>
                <AlertTitle className="alert-title">Error</AlertTitle>This field
                is required!
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid className="item">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar Notification for successfull form submission */}

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbarState}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Form Submitted Successfully!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

    </Container>
  );
}

export default Form;
