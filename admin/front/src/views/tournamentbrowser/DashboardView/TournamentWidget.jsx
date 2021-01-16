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
    let banner_path = "";
    if (rest.gametype === "valorant")
        banner_path = "/static/images/valorant_banner.jpg";
    else if (rest.gametype === "r6")
        banner_path = "/static/images/r6_banner.jpg";
    else
        banner_path = "/static/images/csgo_banner.png";
    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
            to={"/app/tournament/" + rest.id_tournament}
            component={RouterLink}
        >
            <CardMedia
                height="160"
                component="img"
                className={classes.media}
                image={banner_path}
            />
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
                {rest.name}
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
