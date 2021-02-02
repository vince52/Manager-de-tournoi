import React from 'react';
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
import { useEffect } from 'react';
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

const getByID = (id) => {
    //let list = []
    const list = JSON.parse(localStorage.getItem('allTeams'));
    console.log("list:", localStorage.getItem('allTeams'))
    console.log("id", id)
    for (let team = 0; team < list.length; team++) {
        const element = list[team];
        if (element._id == id)
            return list[team]
        
    }
}

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const Dashboard = () => {
    const classes = useStyles();
    const {id} = useParams();
    const thisTeam = getByID(id);  
    console.log(thisTeam)
    function joinTeam() {
        if (thisTeam.members.length >= 5 ) //parseInt({thisTeam.maxmembers}
            return;
        
        API.joinTeam(id)
    }
    return (
        <Page className = { thisTeam.name } title = "Tournament" >
            <Card onClick={joinTeam}>
                Join Team
            </Card>
            <Card style={{ border: '1px solid #aaa' }}>
                <Container maxWidth={false}>
                        <Grid
                            container
                            direction="column"
                            spacing={1}
                        >
                        {thisTeam.members.map((quest, index) =>
                            <Grid item lg={3} sm={3} xl={3} xs={3}>
                                <WhiteTextTypography>{quest.firstname + " " + quest.lastname}</WhiteTextTypography>
                            </Grid>)}
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
                {thisTeam.registeredTeams.map((quest, index) =>
                    <Grid item lg={3} sm={3} xl={3} xs={3}>
                        {quest}
                    </Grid>)}
                </Grid>
        </Container>
    </Page>*/

export default Dashboard;