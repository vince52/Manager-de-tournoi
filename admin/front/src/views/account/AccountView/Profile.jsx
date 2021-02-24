import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import API from '../../../utils/API';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: localStorage.getItem('avatar'),
  userid: localStorage.getItem('userID'),
  name: localStorage.getItem('firstname') + " " + localStorage.getItem('lastname'),
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));


const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const [username, setUsername] = useState([]);
  const [avatar, setAvatar] = useState([]);

  const interval = setInterval(async () => {
    API.getMyUserInformation().then(res=>{
        setUsername(res.user.name)
        setAvatar(res.user.avatar)
    }).catch(e=>{
        console.log(e)
    })
  }, 1000);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {username}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            { user.userid}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => {window.open("http://localhost:8080/user/steam/auth/" + user.userid, "_blank", "width=800, height=600")}}

        >
          Connect to Steam
        </Button>
      </CardActions>
      {localStorage.getItem('name') ?
      <CardContent>
      
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {localStorage.getItem('name') ? "Connected with: " + localStorage.getItem('name') : ""}
          </Typography>
        </Box>
        
      </CardContent>
      : ""}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;