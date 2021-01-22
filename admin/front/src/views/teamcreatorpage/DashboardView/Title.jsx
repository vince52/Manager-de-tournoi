import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  // Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import MoneyIcon from '@material-ui/icons/Money';
// import TextField from '@material-ui/core/TextField';
import { AlignCenter } from 'react-feather';
// import { CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    AlignCenter
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

const ManuelText = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={1}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h1"
            >
            Overview
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ManuelText.propTypes = {
  className: PropTypes.string
};

export default ManuelText;
