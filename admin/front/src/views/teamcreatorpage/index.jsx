import React, { useState } from 'react';
import clsx from 'clsx';
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
  makeStyles,
  Typography,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import {  useNavigate } from "react-router-dom";
import Page from 'src/components/Page';
import API from 'src/utils/API';

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const useStyles = makeStyles(() => ({
  root: {}
}));

const TeamEditor = ({className, ...rest}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    Name:'',
    Password:'',
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const sumbitForm = async () => {
    await API.createTeam(values.Name, values.Password);
    navigate('/app/teams', {replace: true});
  }

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            title="New Team"
            subheader=""
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={8}
                xs={4}
              >
                <TextField
                  fullWidth
                  helperText="Team Name"
                  name="Name"
                  onChange={handleChange}
                  required
                  value={values.Name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={8}
                xs={4}
              >
                <TextField
                  fullWidth
                  helperText="Password"
                  name="Password"
                  onChange={handleChange}
                  required
                  value={values.Password}
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
            onClick={sumbitForm}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};

const TeamEditorPage = () => {
    const classes = useStyles();
    return (
        <Page className = { classes.root } title = "Teameditor">
          <TeamEditor/>
        </Page>
    )
};

export default TeamEditorPage;