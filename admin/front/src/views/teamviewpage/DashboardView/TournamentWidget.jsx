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

const TournamentWidget = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
      <Card
          className={clsx(classes.root, className)}
          {...rest}
          to={"/app/teams/" + rest._id}
          component={RouterLink}
      >
          <CardContent style={{backgroundColor: "#23272A"}}>
          <Grid
              container
              justify="space-between"
              spacing={3}
          >
          <Grid item>
              <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              >
              {rest.nbMembers + "  " + rest.maxMembers}
              </Typography>
          </Grid>
          </Grid>
      </CardContent>
      </Card>
  );
};

TournamentWidget.propTypes = {
  className: PropTypes.string
};

export default TournamentWidget;
