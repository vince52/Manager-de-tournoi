import React from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import MyTournamentWidget from './DashboardView/MyTournamentWidget';

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

const Dashboard = () => {
    const classes = useStyles();
    const mytournaments1 = {
        tournaments: [{
          id_tournament: 1,
          name: "The \"Gabe\" Tournament CSGO",
          owners: [],
          gametype: "csgo",
          nbTeamRegister: 1,
          nbTeamLimit: 2,
          gamemode: "Competitive",
          creationDate: 0,
          beginningDate: 0,
          endRegistrationDate: "14/01/2021",
          cashprize: 10000,
          Timezone: "Eutope/Paris (UTC+1)"
        },
        {
            id_tournament: 4,
            name: "My Tournament Rainbow Six",
            owners: [],
            gametype: "r6",
            nbTeamRegister: 5,
            nbTeamLimit: 32,
            gamemode: "3v3",
            creationDate: 0,
            beginningDate: 0,
            endRegistrationDate: "14/01/2021",
            cashprize: 4000,
            Timezone: "Eutope/Paris (UTC+1)"
        },
        {
            id_tournament: 5,
            name: "My T",
            owners: [],
            gametype: "valorant",
            nbTeamRegister: 5,
            nbTeamLimit: 32,
            gamemode: "3v3",
            creationDate: 0,
            beginningDate: 0,
            endRegistrationDate: "14/01/2021",
            cashprize: 4000,
            Timezone: "Eutope/Paris (UTC+1)"
        }]
    }
    return (
        <Page className = { classes.root } title = "Dashboard" >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={1}
                >
                {mytournaments1.tournaments.map((quest, index) =>
                <Grid item lg={3} sm={3} xl={3} xs={3}>
                    <MyTournamentWidget
                    key={index}
                    name={quest.name}
                    gametype={quest.gametype}
                    id_tournament={quest.id_tournament}
                    nbTeamRegister={quest.nbTeamRegister}
                    nbTeamLimit={quest.nbTeamLimit}
                    gamemode={quest.gamemode}
                    endRegistrationDate={quest.endRegistrationDate}
                    cashprize={quest.cashprize}
                    Timezone={quest.Timezone}
                    /></Grid>)}
                </Grid>
            </Container>
        </Page>
    )
};

export default Dashboard;