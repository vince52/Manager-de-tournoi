import React, { useState, useEffect }  from 'react';
import {
    green, purple,
    Button,
    Card,
    Container,
    CardContent,
    Grid,
    makeStyles,
    Typography,
    withStyles
} from '@material-ui/core';
import { useParams, useNavigate } from "react-router-dom";

import * as _ from 'underscore';
import $ from 'jquery';
import jQuery from 'jquery'
import * as JSOG from 'jsog';
import DEMO_DATA from './data';
import ReactDOM from 'react-dom';
import TournamentWidget from './DashboardView/TournamentWidget';
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

const useStyles2 = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const Dashboard = () => {
    const classes = useStyles();
    const classes2 = useStyles();
    const {id} = useParams();
    function joinTeam() {
        if (team.members.length >= 5 ) //parseInt({thisTeam.maxmembers}
            return;
        
        API.joinTeam(id)
        window.location.reload(false);

    }

    function leaveTeam() {
        API.leaveTeam(id)
        window.location.reload(false);
        
    }
    const navigate = useNavigate();

    function deleteTeam() {
        
        API.deleteTeam(id)
        navigate('/app/teams', {replace: true})
    }
    const [team, setTeam] = useState([]);
    useEffect(()=> {
        async function fetchAPI() {
            console.log("Fetching teams...")
            API.getTeam(id).then(res=>{
                console.log(res)
                if (res.team !== undefined) {
                    setTeam(res.team[0])
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
        <Page className = {team ? team.name : "" } title = { team ?team.name : ""} >
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
                        > Members</Typography>
                        <br />
                        {team && team.members ? team.members.map((quest, index) =>
                        <Grid item lg={3} sm={3} xl={3} xs={3} >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                                style={{"margin": '20px'}}  
                            >
                            {quest.firstname + "   " + quest.lastname}
                            </Typography>
                        </Grid>) : ""}
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
                            <Button onClick={joinTeam} variant="contained" color="primary" style={{ marginLeft: '5px' }}>JOIN</Button>
                            <Button onClick={leaveTeam} variant="contained" color="secondary" style={{ marginLeft: '5px' }}>LEAVE</Button>
                            <Button onClick={deleteTeam} variant="contained" color="secondary" style={{ marginLeft: '5px' }}>DELETE</Button>
                        </Card>
                    </Grid>
                </Grid>
                {/* <Grid item lg={3} sm={3} xl={3} xs={3} style={{ border: '1px solid #aaa', height: '200px', }}>
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
                </Grid> */}
            </Container>
        </Page>
        // <Page className = { thisTeam.name } title = "Tournament" >
            
        //     <Card style={{ border: '1px solid #aaa' }}>
        //         <Container maxWidth={false}>
        //                 <Grid
        //                     container
        //                     direction="column"
        //                     spacing={1}
        //                 >
        //                 {thisTeam.members.map((quest, index) =>
        //                     <Grid item lg={3} sm={3} xl={3} xs={3}>
        //                         <WhiteTextTypography>{quest.firstname + " " + quest.lastname}</WhiteTextTypography>
        //                     </Grid>)}
        //                 </Grid>
        //         </Container>
        //     </Card>
        //     <Card style={{ border: '1px solid #aaa' }} onClick={joinTeam}>
        //         <Container maxWidth={false}>
        //                     <Grid
        //                         container
        //                         direction="column"
        //                         spacing={1}
        //                     >
                                
        //                     Join Team
        //                     </Grid>
        //         </Container>
                
        //     </Card>
        // </Page>

    )
};

/*
    <Page className = { classes.root } title = "Tournament Browser" >
        <Container maxWidth={false}>
                <Grid
                    container
                    spacing={1}
                >
                {thisTeam.registeredTeams.map((quest, index) =>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        {quest}
                    </Grid>)}
                </Grid>
        </Container>
    </Page>*/

export default Dashboard;