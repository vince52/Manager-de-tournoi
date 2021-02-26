import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Collapse,
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import { useParams, useNavigate } from "react-router-dom";
import Page from 'src/components/Page';
import API from 'src/utils/API';

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const useStyles = makeStyles(() => ({
  root: {}
}));

const TournamentEditor = ({className, ...rest}) => {
  const classes = useStyles();
  const gametypes = [
    {
      value: 'csgo',
      label: 'CS:GO',
    },
    {
      value: 'r6',
      label: 'Rainbow Six Seige',
    },
    {
      value: 'valorant',
      label: 'Valorant',
    },
  ];

  const [values, setValues] = useState({
    Name:'',
    nbPlayers:'',
    Gamemode:'',
  })

  const [gametypevalue, setGametypevalue] = useState('csgo');

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChange2 = (event) => {
    setGametypevalue(event.target.value);
  };
  const navigate = useNavigate();
  const sumbitForm = async () => {
    console.log("Submit tournament: " + values.Name + " " + values.nbPlayers + " " + gametypevalue + " " + values.Gamemode);
    await API.postNewTournament(values.Name, parseInt(values.nbPlayers, 10), gametypevalue, values.Gamemode);
    navigate('/app/mytournaments/', {replace: true})
  }

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            title="New Tournament"
            subheader=""
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={8}
                xs={4}
              >
                <TextField
                  fullWidth
                  helperText="Tournament Name"
                  name="Name"
                  onChange={handleChange}
                  required
                  value={values.Name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={8}
                xs={4}
              >
                <TextField
                  fullWidth
                  helperText="Number of players per team"
                  name="nbPlayers"
                  onChange={handleChange}
                  required
                  value={values.nbPlayers}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={8}
                xs={4}
              >
                <TextField
                  fullWidth
                  select
                  helperText="Number of players per team"
                  name="gametypevalue"
                  onChange={handleChange2}
                  required
                  value={gametypevalue}
                  variant="outlined"
                >
                  {gametypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={8}
                xs={4}
              >
                <TextField
                  fullWidth
                  helperText="Gamemode"
                  name="Gamemode"
                  onChange={handleChange}
                  required
                  value={values.Gamemode}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
            onClick={sumbitForm}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};

const TournamentEditorPage = () => {
    const classes = useStyles();
    return (
        <Page className = { classes.root } title = "Tournamenteditor">
          <TournamentEditor/>
        </Page>
    )
};

export default TournamentEditorPage;