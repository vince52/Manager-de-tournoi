import React, {useState, useEffect} from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import TournamentWidget from './DashboardView/TournamentWidget';

import API from '../../utils/API';

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

    const [tournaments, setTournaments] = useState([]);
    useEffect(()=> {
        async function fetchAPI() {
            console.log("Fetching tournaments...")
            API.getTournaments().then(res=>{
                console.log(res)
                if (res.tournaments !== undefined) {
                    setTournaments(res.tournaments)
                }
            }).catch(e=>{
                console.log(e)
            })
        };
        console.log("print 2")
        fetchAPI()
    }, []);

    return (
        <Page className = { classes.root } title = "Tournament Browser" >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={1}
                >
                {tournaments.map((quest, index) =>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <TournamentWidget
                            key={index}
                            name={quest.name}
                            gametype={quest.gametype}
                            _id={quest._id}
                        />
                    </Grid>)}
                </Grid>
            </Container>
        </Page>
    )
};

export default Dashboard;