import React, {Component} from 'react';
import {
    makeStyles,
    Grid,
    Typography
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Page from 'src/components/Page';

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
        Gamemode: '',
        Rewards: '',
        TournamentDate: ''
      };
    }

    onChange = (e) => {
      /*
        Because we named the inputs to match their
        corresponding values in state, it's
        super easy to update the state
      */
      this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { Name, nbPlayers, Gamemode, Rewards, TournamentDate } = this.state;

      }

    render() {
      const { Name, nbPlayers, Gamemode } = this.state;
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
                value={Name}
                onChange={this.onChange}
            />
            </Grid>
            <Grid item>
            <WhiteTextTypography>Game:</WhiteTextTypography>
            <select>
            <option selected value="csgo">CS : GO</option>
            <option value="r6">Rainbow 6 : Seige</option>
            <option value="valorant">Valorant</option>
            </select>
            </Grid>
            <Grid item>
            <input
                type="text"
                name="nbPlayers"
                value={nbPlayers}
                onChange={this.onChange}
            />
            </Grid>
            <Grid item>
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