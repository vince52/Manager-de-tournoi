import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
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
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.userid}`}
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