import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Collapse,
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import API from 'src/utils/API'

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: localStorage.getItem('firstname'),
    lastName: localStorage.getItem('lastname'),
    email: localStorage.getItem('email'),
  });
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);

  const changePass = async () => {
  if (values.email && values.firstName && values.lastName) {
    if (await API.updateInformations(values.email, values.firstName, values.lastName) === true) {
      console.log("test");
      setFailure(false);
      setSuccess(true);
    } else {
      console.log("test2");
      setFailure(true);
      setSuccess(false);
    }
  } else {
    console.log("test3");
    setFailure(false);
    setSuccess(false);
  }
}

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <Collapse in={failure}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setFailure(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Error, Cannot save the new password
        </Alert>
      </Collapse>
      <Collapse in={success}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Success!
        </Alert>
      </Collapse>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
            onClick={changePass}
              color="primary"
              variant="contained"
            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

        