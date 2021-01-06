import React from 'react';
import {
    Card,
    Container,
    CardContent,
    Grid,
    makeStyles
} from '@material-ui/core';

import * as _ from 'underscore';
import $ from 'jquery';
import jQuery from 'jquery'
import * as JSOG from 'jsog';
import DEMO_DATA from './data';
import { Bracket, BracketGame, BracketGenerator, Model } from 'react-tournament-bracket';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import Page from 'src/components/Page';
//import bracket from './js/brackets'

const useScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

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
    
    useScript("/static/js/brackets.js");

    
    var rounds;
    rounds = [
            //-- round 1
        [
            {
                player1: { name: "Player 111", winner: true, ID: 111 },
                player2: { name: "Player 211", ID: 211 }
            },
            {
                player1: { name: "Player 112", winner: true, ID: 112 },
                player2: { name: "Player 212", ID: 212 }
            },
            {
                player1: { name: "Player 113", winner: true, ID: 113 },
                player2: { name: "Player 213", ID: 213 }
            },
            {
                player1: { name: "Player 114", winner: true, ID: 114 },
                player2: { name: "Player 214", ID: 214 }
            },
            {
                player1: { name: "Player 115", winner: true, ID: 115 },
                player2: { name: "Player 215", ID: 215 }
            },
            {
                player1: { name: "Player 116", winner: true, ID: 116 },
                player2: { name: "Player 216", ID: 216 }
            },
            {
                player1: { name: "Player 117", winner: true, ID: 117 },
                player2: { name: "Player 217", ID: 217 }
            },
            {
                player1: { name: "Player 118", winner: true, ID: 118 },
                player2: { name: "Player 218", ID: 218 }
            },
        ],
            //-- round 2
        [
            {
                player1: { name: "Player 111", winner: true, ID: 111 },
                player2: { name: "Player 212", ID: 212 }
            },
            {
                player1: { name: "Player 113", winner: true, ID: 113 },
                player2: { name: "Player 214", ID: 214 }
            },
            {
                player1: { name: "Player 115", winner: true, ID: 115 },
                player2: { name: "Player 216", ID: 216 }
            },
            {
                player1: { name: "Player 117", winner: true, ID: 117 },
                player2: { name: "Player 218", ID: 218 }
            },
        ],
            //-- round 3
        [
            {
                player1: { name: "Player 111", winner: true, ID: 111 },
                player2: { name: "Player 113", ID: 113 }
            },
            {
                player1: { name: "Player 115", winner: true, ID: 115 },
                player2: { name: "Player 218", ID: 218 }
            },
        ],
            //-- round 4
        [
            {
                player1: { name: "Player 113", winner: true, ID: 113 },
                player2: { name: "Player 218", winner: true, ID: 218 },
            },
        ],
            //-- Champion
        [
            {
                player1: { name: "Player 113", winner: true, ID: 113 },
            },
        ],
    ];

    var titles = ['round 1', 'round 2', 'round 3', 'round 4', 'round 5'];
    //var games = JSOG.decode(DEMO_DATA);
    //const game: any = _.findWhere(games, { id: '35b0745d-ef13-4255-8c40-c9daa95e4cc4' });

    //const handle() = () =>
    return (
        <Card className={classes.root} title="Dashboard" >
            <CardContent>
            <Container maxWidth={false}>
                <Grid container spacing={1}>
                    <div class="brackets">fdsfsdfsdf</div>
                    {() => $(".brackets").brackets({
                        rounds: rounds,
                        titles: titles,
                        color_title: 'white',
                        border_color: 'black',
                        color_player: 'black',
                        bg_player: 'white',
                        color_player_hover: 'black',
                        bg_player_hover: 'white',
                        border_radius_player: '15px',
                        border_radius_lines: '154px',
                    })}
                </Grid>
            </Container>
            </CardContent>
        </Card>,
        function() {
        $(".brackets").brackets({
            rounds: rounds,
            titles: titles,
            color_title: 'white',
            border_color: 'black',
            color_player: 'black',
            bg_player: 'white',
            color_player_hover: 'black',
            bg_player_hover: 'white',
            border_radius_player: '15px',
            border_radius_lines: '154px',
            });
        }
    )
};


export default Dashboard;