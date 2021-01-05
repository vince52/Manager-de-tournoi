import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const MyTournamentWidget = ({ className, ...rest }) => {
    const classes = useStyles();
    let banner_path = "";
    if (rest.gametype === "valorant")
        banner_path = "/static/images/valorant_banner.jpg";
    else if (rest.gametype === "r6")
        banner_path = "/static/images/r6_banner.jpg";
    else
        banner_path = "/static/images/csgo_banner.png";
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={banner_path}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {rest.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Registered: {rest.nbTeamRegister}/{rest.nbTeamLimit}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
};

MyTournamentWidget.propTypes = {
  className: PropTypes.string
};

export default MyTournamentWidget;
