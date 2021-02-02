import React, {useState, useEffect} from 'react';
import {
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
                    console.log(res.tournament.matchs._id)
                    API.getMatchs(res.tournament.matchs).then(res=>{
                        console.log("res", res.matchs)
                        setMatchs(res.matchs)
                    })
                }
            }).catch(e=>{
                console.log(e)
            })
        };
        console.log("print 2")
        fetchAPI()
        {console.log(tournament)}
    }, []);
    return (
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