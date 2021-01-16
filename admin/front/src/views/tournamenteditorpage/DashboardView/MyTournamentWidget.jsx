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
        banner_path = "/static/images/valorant_vbanner.png";
    else if (rest.gametype === "r6")
        banner_path = "/static/images/r6_vbanner.jpg";
    else
        banner_path = "/static/images/csgo_vbanner.jpg";
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
        to={"/app/mytournaments/" + rest.id_tournament}
        component={RouterLink}
      >
        <Grid
          container
        >
          <Grid item xs={12} sm={2}>
            <CardMedia
              height="200"
              component="img"
              image={banner_path}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {rest.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Registered: {rest.nbTeamRegister}/{rest.nbTeamLimit}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Gamemode: {rest.gamemode}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                End of Registration Date: {rest.endRegistrationDate}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Cashprize: {rest.cashprize}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Timezone: {rest.Timezone}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
};

MyTournamentWidget.propTypes = {
  className: PropTypes.string
};

export default MyTournamentWidget;
