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

    const [match, setMatch] = useState({});
    const [players, setPlayer] = useState({});
    const [name1, setName1] = useState({});
    const [name2, setName2] = useState({});
    const [leftteam, setleftteam] = useState({});
    const [rightteam, setrightteam] = useState({});
    useEffect(()=> {
        function do_thing() {}
        async function fetchAPI() {
            console.log("Fetching solo tournaments...")
            API.getSingleMatch(id).then(res=>{
                console.log(res.matchs)
                setMatch(res.matchs)
                API.getTeam(res.matchs.left_team).then(resl=>{
                    if (resl.team && resl.team[0]) {
                        setleftteam(resl.team[0])
                        console.log(resl.team[0])
                    }
                })
                API.getTeam(res.matchs.right_team).then(resr=>{
                    if (resr.team && resr.team[0])
                        setrightteam(resr.team[0])
                })
                //JSON.stringify(res.matchs.left_team.name) !== undefined  ? setName1(res.matchs.left_team.name) : setName1("")
                //JSON.stringify(res.matchs.right_team.name) !== undefined  ? setName2(res.matchs.right_team.name) : setName2("")
            }).catch(e=>{
                console.log(e)
            })
        };
        fetchAPI()
    }, []);

    function startMatch() {
        API.startMatch(id).then(res =>{
            console.log(res)
            setPlayer(res.players)
        })

    }

    return (
        //<Page className = { match.name } title = { tournament.name } >
        <Container>
        <Card variant="outlined">
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h2"
                        style={{"textAlign": 'center'}}
                    > { (leftteam.name ? leftteam.name : "undefined") + " .vs. " + (rightteam.name ? rightteam.name : "undefined")}</Typography>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h2"
                        style={{"textAlign": 'center'}}
                    > {match.when} 
                        <Button variant="contained" color="secondary" style={{ marginLeft: '5px' } } type="submit" onClick={() => { startMatch()}} >START</Button>
                    </Typography>
                </Card>
                <br/>
                <br />
                <br/>
            <Grid
                container
                margin={10}
                spacing={3}
            >
                <Grid item xs={6}>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h3"
                        style={{"textAlign": 'center'}}
                    > {"SCORE : " + (match.left_score ? match.left_score : "0")}</Typography>
                    <br/>
                    <Card>
                        <Typography color="textSecondary" gutterBottom variant="h5" style={{"textAlign": 'left'}}>
                            <Grid container direction="row">
                                <Grid item xs={6}>{""}</Grid>
                                <Grid item xs={2}>{"K"}</Grid>
                                <Grid item xs={2}>{"D"}</Grid>
                                <Grid item xs={2}>{"A"}</Grid>
                            </Grid>
                        </Typography>
                        {leftteam.members ? (leftteam.members.map((quest, index) =>
                        <Grid item lg={12} sm={12} xl={12} xs={12} >
                            <Grid container direction="row">
                                <Grid item xs={6}>
                                    <Typography color="textSecondary" gutterBottom variant="h5" style={{"textAlign": 'left'}}>
                                        {quest.firstname + " \"" + quest.name + "\" " + quest.lastname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>{players[index].Kill.toString()}</Grid>
                                <Grid item xs={2}>{"0"}</Grid>
                                <Grid item xs={2}>{"0"}</Grid>
                            </Grid>
                        </Grid>)) : "" }
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h3"
                        style={{"textAlign": 'center'}}
                    > {"SCORE : " + (match.right_score ? match.right_score : "0")}</Typography>
                    <br/>
                    <Card>
                        <Typography color="textSecondary" gutterBottom variant="h5" style={{"textAlign": 'left'}}>
                            <Grid container direction="row">
                                <Grid item xs={6}>{""}</Grid>
                                <Grid item xs={2}>{"K"}</Grid>
                                <Grid item xs={2}>{"D"}</Grid>
                                <Grid item xs={2}>{"A"}</Grid>
                            </Grid>
                        </Typography>
                        {rightteam.members ? (rightteam.members.map((quest, index) =>
                        <Grid item lg={12} sm={12} xl={12} xs={12} >
                            <Grid container direction="row">
                                <Grid item xs={6}>
                                    <Typography color="textSecondary" gutterBottom variant="h5" style={{"textAlign": 'left'}}>
                                        {quest.firstname + " \"" + quest.name + "\" " + quest.lastname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>{"0"}</Grid>
                                <Grid item xs={2}>{"0"}</Grid>
                                <Grid item xs={2}>{"0"}</Grid>
                            </Grid>
                        </Grid>)) : "" }
                    </Card>
                </Grid>
            </Grid>
        </Container>
    //</Page>
    )
};

export default Dashboard;