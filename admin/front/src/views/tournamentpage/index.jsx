import React from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';

import * as _ from 'underscore';
import * as JSOG from 'jsog';
import DEMO_DATA from './data';
import { Bracket, BracketGame, BracketGenerator, Model } from 'react-tournament-bracket';
import {render} from 'react-dom';

import Page from 'src/components/Page';

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
    var games = JSOG.decode(DEMO_DATA);
    const game: any = _.findWhere(games, { id: '35b0745d-ef13-4255-8c40-c9daa95e4cc4' });

    return (
        <Page className = { classes.root } title = "Dashboard" >
            <Container maxWidth={false}>
                <Grid container spacing={1}>
                    <Bracket game={game}/>
                </Grid>
            </Container>
        </Page>
    );
};

export default Dashboard;