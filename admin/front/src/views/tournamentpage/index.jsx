import React, {useState, useEffect} from 'react';
import {
    Menu,
    MenuItem,
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
    const [myteams, setMyTeams] = useState([]);
    useEffect(()=> {
        async function fetchAPI() {
            console.log("Fetching solo tournaments...")
            localStorage.setItem('lasttournament', id)
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

            API.getOwnTeam().then(res=>{
                console.log(res)
                if (res.team) {
                    console.log("res teams", res.team)
                    setMyTeams(res.team)
                }
            }).catch(e=>{
                console.log(e)
            })

        };
        console.log("print 2")
        fetchAPI()
        {console.log(tournament)}
    }, []);

    const navigate = useNavigate();

    function startTournament() {
        if (tournament.registeredTeams.length != 16 ) //parseInt({thisTeam.maxmembers}
            return;
        API.startTournament(id)
    }

    function joinTournament(teamid) {
        API.joinTournament(id, teamid)
        window.location.reload(false);

    }

    function leaveTournament() {
        API.leaveTournament(id)
    }

    function deleteTournament() {
        console.log("test")
        API.deleteTournament(id)
        navigate('../', {replace: true})
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

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
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" color="primary" style={{ marginLeft: '5px' }}> JOIN </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            >
                            {myteams ? (myteams.map((quest, index) =>
                            <MenuItem onClick={() => {joinTournament(quest._id)}}>{quest.name}</MenuItem>
                            )): ""}
                        </Menu>
                        <Button variant="contained" color="secondary" style={{ marginLeft: '5px' }}>LEAVE</Button>
                        <Button variant="contained" color="secondary" style={{ marginLeft: '5px' } } type="submit" onClick={() => { deleteTournament()}} >DELETE</Button>
                        <Button variant="contained" color="secondary" style={{ marginLeft: '5px' } } type="submit" onClick={() => { startTournament()}} >START</Button>
                    </Card>
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            {matchs.left ?  <TournamentWidget matchs={JSON.stringify(matchs)}/> : ""}
        </Container>
    </Page>
    )
};

export default Dashboard;