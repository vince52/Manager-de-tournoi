import React, {Component} from 'react';
import {
    makeStyles,
    Grid,
    Typography
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Page from 'src/components/Page';
import API from '../../utils/API';

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

class TeamsForm extends Component {
    constructor() {
      super();
      this.state = {
        Name: '',
        Password: ''
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
        const { Name, Password } = this.state;
        API.createTeam(Name, Password);
      }

    render() {
      const { Name, Password } = this.state;
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
            <WhiteTextTypography>Password:</WhiteTextTypography>
            <input
                type="text"
                name="Password"
                value={Password}
                onChange={this.onChange}
            />
            </Grid>
            <button type="submit">Submit</button>
        </Grid>
        </form>
      );
    }
  }

const TeamPage = () => {
    const classes = useStyles();
    return (
        <Page className = { classes.root } title = "Tournamenteditor" >
            <WhiteTextTypography variant="h1">New Team</WhiteTextTypography>
            <TeamsForm/>
        </Page>
    )
};

export default TeamPage;