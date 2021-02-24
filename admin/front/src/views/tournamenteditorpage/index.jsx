import React, {Component} from 'react';
import {
    makeStyles,
    Grid,
    Typography
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Page from 'src/components/Page';
import API from 'src/utils/API';

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));

class UserForm extends Component {
    constructor() {
      super();
      this.state = {
        Name: '',
        nbPlayers: '',
        value: '',
        Gamemode: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { Name, nbPlayers, Gametype, Gamemode } = this.state;
        console.log("Submitting tournament: " + Name + nbPlayers + Gametype + Gamemode);
        //API.postNewTournament(Name, nbPlayers, Gametype, Gamemode);
      }

    render() {
      const { Name, nbPlayers, Gametype, Gamemode } = this.state;
      return (
        <form onSubmit={this.onSubmit}>
        <Grid
            container
            direction="column"
        >
            <Grid item>
            <WhiteTextTypography>Name:</WhiteTextTypography>
            <input
                type="text"
                name="Name"
                onChange={this.onChange}
            />
            </Grid>
            <Grid item>
            <WhiteTextTypography>Gametype:</WhiteTextTypography>
            <select value={this.state.value} onChange={this.handleChange}>
            <option selected value="csgo">CS : GO</option>
            <option value="r6">Rainbow 6 : Seige</option>
            <option value="valorant">Valorant</option>
            </select>
            </Grid>
            <Grid item>
            <WhiteTextTypography>Gametype:</WhiteTextTypography>
            <input
                type="number"
                name="Gametype"
                value={Gametype}
                onChange={this.onChange}
            />
            <button type="submit">Submit</button>
            </Grid>
            <Grid item>
            <WhiteTextTypography>Gamemode:</WhiteTextTypography>
            <input
                type="text"
                name="Gamemode"
                value={Gamemode}
                onChange={this.onChange}
            />
            <button type="submit">Submit</button>
            </Grid>
        </Grid>
        </form>
      );
    }
  }

const TournamentEditorPage = () => {
    const classes = useStyles();
    return (
        <Page className = { classes.root } title = "Tournamenteditor" >
            <WhiteTextTypography variant="h1">New Tournament</WhiteTextTypography>
            <UserForm/>
        </Page>
    )
};

export default TournamentEditorPage;