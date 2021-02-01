import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    makeStyles,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import Page from 'src/components/Page';
import TournamentWidget from './DashboardView/TournamentWidget';
import AddIcon from '@material-ui/icons/Add';
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

    const [teams, setTeams] = useState([]);
    useEffect(()=> {
        async function fetchAPI() {
            console.log("Fetching teams...")
            API.getTeams().then(res=>{
                console.log(res)
                if (res.team !== undefined) {
                    setTeams(res.team)
                    localStorage.setItem('allTeams', JSON.stringify(res.team))
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
                {teams.map((quest, index) =>
                <Grid item lg={3} sm={3} xl={3} xs={3}>
                    <Card>
                    <TournamentWidget
                        key={index}
                        name={quest.name}
                        nbMembers={quest.members.length}
                        maxMembers="5"//{quest.maxmembers}
                        _id={quest._id}
                     />
                     </Card>
                </Grid>)}
                </Grid>
                <Grid item lg={3} sm={3} xl={3} xs={3} style={{ border: '1px solid #aaa', height: '200px', }}>
                    <Card
                        to={"/app/teamcreator/"}
                        component={RouterLink}
                    >
                        <CardContent textAlign="center">
                            <Typography>
                                Create Team
                            </Typography>
                            <AddIcon/>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </Page>
    )
};

export default Dashboard;