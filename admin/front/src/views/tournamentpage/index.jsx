import React, {useState, useEffect} from 'react';
import {
    Button,
    Card,
    Container,
    CardContent,
    Grid,
    makeStyles,
    Typography,
    withStyles
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import * as _ from 'underscore';
import $ from 'jquery';
import jQuery from 'jquery'
import * as JSOG from 'jsog';
import DEMO_DATA from './data';
import ReactDOM from 'react-dom';
import Page from 'src/components/Page';
import API from '../../utils/API';
import TournamentWidget from './DashboardView/TournamentWidget';
import { ContactsOutlined } from '@material-ui/icons';

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

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const Dashboard = () => {
    const classes = useStyles();
    const {id} = useParams();
    const thisTournament = {}  
    //console.log(thisTournament) 
    const [tournament, setTournament] = useState({});
    const [matchs, setMatchs] = useState({});
    useEffect(()=> {
        async function fetchAPI() {
            console.log("Fetching solo tournaments...")
            API.getTournament(id).then(res=>{
                console.log(res)
                if (res.tournament) {
                    setTournament(res.tournament)
                    if (res.tournament.matchs) {
                        API.getMatchs(res.tournament.matchs).then(res=>{
                            console.log("res matches", res.matchs)
                            setMatchs(res.matchs)
                        })
                    }
                }
            }).catch(e=>{
                console.log(e)
            })
        };
        console.log("print 2")
        fetchAPI()
        {console.log(tournament)}
    }, []);

    function joinTournament() {
        if (tournament.registeredTeams.length >= 16 ) //parseInt({thisTeam.maxmembers}
            return;
        //API.userTeams(User._id)
        API.joinTournament(id)//, teamid)
    }

    function leaveTournament() {
        API.leaveTournament(id)//, teamid)
    }

    function deleteTournament() {
        console.log("test")
        API.deleteTournament(id)
    }

    return (
        <Page className = { tournament.name } title = { tournament.name } >
        <Container>
            <Grid
                container
                margin={10}
                spacing={1}
            >
                    <br />
                <Grid item xs={6} >
                <Card variant="outlined">
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h2"
                        style={{"textAlign": 'center'}}
                    > Teams</Typography>
                    <br />
                    {tournament.registeredTeams ? (tournament.registeredTeams.map((quest, index) =>
                        <Grid item lg={3} sm={3} xl={3} xs={3} >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                                style={{"margin": '20px'}}  
                            >
                            {quest.name}
                            </Typography>
                        </Grid>)) : ""}
                </Card>
                </Grid>
                <Grid xs={4}>
                    <Card>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h2"
                        style={{"textAlign": 'center'}}
                    > Manage</Typography>
                        <br />
                        <Button variant="contained" color="primary" style={{ marginLeft: '5px' }}>JOIN</Button>
                        <Button variant="contained" color="secondary" style={{ marginLeft: '5px' }}>LEAVE</Button>
                        <Button variant="contained" color="secondary" style={{ marginLeft: '5px' } } type="submit" onClick={() => { deleteTournament()}} >DELETE</Button>
                    </Card>
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            {matchs.left ?  <TournamentWidget matchs={JSON.stringify(matchs)}/> : ""}
        </Container>
    </Page>
        /*
        <Page className = { tournament.name } title = { tournament.name } >
            <Card style={{ border: '1px solid #aaa' }}>
                <Container maxWidth={false}>
                        <Grid
                            container
                            direction="column"
                            spacing={1}
                        >
                            {tournament.registeredTeams ? tournament.registeredTeams.map((value) => {

                                return <Grid item lg={3} sm={3} xl={3} xs={3}> <WhiteTextTypography> {value.name} </WhiteTextTypography></Grid>
                            }) : ""}                            
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            spacing={1}
                        >
                            {JSON.stringify(matchs)}
                        </Grid>
                </Container>
            </Card>
        </Page>
                            */
    )
};

/*
    <Page className = { classes.root } title = "Tournament Browser" >
        <Container maxWidth={false}>
                <Grid
                    container
                    spacing={1}
                >
                {thisTournament.registeredTeams.map((quest, index) =>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        {quest}
                    </Grid>)}
                </Grid>
        </Container>
    </Page>*/

export default Dashboard;