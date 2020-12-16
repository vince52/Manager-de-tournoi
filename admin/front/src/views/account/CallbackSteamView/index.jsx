import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import API from 'src/utils/API';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SteamcallbackView = () => {
  const classes = useStyles();
// Assuming "?post=1234&action=edit"

  var urlParams = new URLSearchParams(window.location.search);

  var URL = "http://localhost:3000/app/steam/return" + urlParams.toString(); // true
  const apireq = async () => {
    if (API.SteamCallback(urlParams.toString())) {
      console.log("OK");
    } else {
      console.log("KO");
    }
    console.log(API.GetAvatar())
  }
  apireq();
  return (
    <Page
      className={classes.root}
      title="CallbackSteamView"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SteamcallbackView;
