import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
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

var cardStyle = {
  display: 'block',
  width: '12vw',
  transitionDuration: '0.3s',
  height: '3vw',
  textAlign: 'center',
  marginBottom: '35px',
}

const MatchWidget = ({ className, ...rest }) => {
  const classes = useStyles();
  const name_left = (rest.match.left_team) ? rest.match.left_team.name : ""
  const name_right = (rest.match.right_team) ? rest.match.right_team.name : ""
  const score_left = (rest.match.score_left) ? rest.match.score_left : "0"
  const score_right = (rest.match.score_right) ? rest.match.score_right : "0"

  return(
    <Card style={cardStyle}>
      <Grid container direction="row">
        <Grid item xs>
          <Typography color="textSecondary" gutterBottom variant="h4" style={{"textAlign": 'left', 'marginLeft': '15px'}}>
            {name_left}
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="h4" style={{"textAlign": 'left', 'marginLeft': '15px'}}>
            {name_right}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography gutterBottom variant="h4" style={{"textAlign": 'right', 'marginRight': '15px'}}>
            {score_right}
          </Typography>
          <Typography gutterBottom variant="h4" style={{"textAlign": 'right', 'marginRight': '15px'}}>
            {score_left}
          </Typography>
        </Grid>
      </Grid>

    </Card>
  );
}

const TournamentWidget = ({ className, ...rest }) => {
    const classes = useStyles();
    const matchs = JSON.parse(rest.matchs)
    console.log("look 2", matchs)
    return (
      <Grid
        container
        {...rest}
        direction="row-reverse"
        justify="space-between"
        alignItems="center"
        spacing={150}
      >
        <Grid item xs>
          <MatchWidget style={cardStyle} match={matchs}/>
        </Grid>
        <Grid item xs>
          <MatchWidget style={cardStyle} match={matchs.left}/>
          <MatchWidget style={cardStyle} match={matchs.right}/>
        </Grid>
        <Grid item xs>
          <MatchWidget style={cardStyle} match={matchs.left.left}/>
          <MatchWidget style={cardStyle} match={matchs.left.right}/>
          <MatchWidget style={cardStyle} match={matchs.right.left}/>
          <MatchWidget style={cardStyle} match={matchs.right.right}/>
        </Grid>
        <Grid item xs>
          <MatchWidget style={cardStyle} match={matchs.left.left.left}/>
          <MatchWidget style={cardStyle} match={matchs.left.left.right}/>
          <MatchWidget style={cardStyle} match={matchs.left.right.left}/>
          <MatchWidget style={cardStyle} match={matchs.left.right.right}/>
          <MatchWidget style={cardStyle} match={matchs.right.left.left}/>
          <MatchWidget style={cardStyle} match={matchs.right.left.right}/>
          <MatchWidget style={cardStyle} match={matchs.right.right.left}/>
          <MatchWidget style={cardStyle} match={matchs.right.right.right}/>
        </Grid>
      </Grid>
      /*
        <Card
            className={clsx(classes.root, className)}
            {...rest}
            to={"/app/tournament/" + rest.id_tournament}
            component={RouterLink}
        >
        </Card>
      */
    );
};

TournamentWidget.propTypes = {
  className: PropTypes.string
};

export default TournamentWidget;
