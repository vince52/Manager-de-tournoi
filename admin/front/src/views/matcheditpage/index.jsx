import React, {useEffect, useState} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import Page from 'src/components/Page';
import ProfileDetails from './ProfileDetails';
import API from '../../utils/API';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
