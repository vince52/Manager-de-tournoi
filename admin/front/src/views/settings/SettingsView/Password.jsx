import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import API from 'src/utils/API'
import {
  Collapse,
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close'
const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: '',
  });
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const changePass = async () => {
    if (values.password === values.confirm && values.password !== "") {
      if (await API.updatePassword(values.password) === true) {
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
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="Update password"
            title="Password"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={changePass}
            >
              Update
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
