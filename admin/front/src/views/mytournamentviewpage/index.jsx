import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {
    Collapse,
    IconButton,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    makeStyles,
    Typography,
  } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams, useNavigate } from "react-router-dom";

import * as _ from 'underscore';
import $ from 'jquery';
import jQuery from 'jquery'
import * as JSOG from 'jsog';

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

const MyTournamentViewPage = ({className, ...rest}) => {
    const {id} = useParams();

    const [values, setValues] = useState({
        Name:'',
        nbPlayers:'',
        Gamemode:'',
    })

    const [gametypevalue, setGametypevalue] = useState('csgo');

    useEffect(()=> {
        async function fetchAPI() {
            API.getTournament(id).then(res=>{
                setValues({Name:res.tournament.name, nbPlayers:res.tournament.nbTeamLimit ,Gamemode:res.tournament.gameMode});
                setGametypevalue(res.tournament.gameType);
            }).catch(e=>{
                console.log(e)
            })
        };
        fetchAPI();
    }, []);

    const classes = useStyles();
    const gametypes = [
        {
        value: 'csgo',
        label: 'CS:GO',
        },
        {
        value: 'r6',
        label: 'Rainbow Six Seige',
        },
        {
        value: 'valorant',
        label: 'Valorant',
        },
    ];


    const handleChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
    };

    const handleChange2 = (event) => {
        setGametypevalue(event.target.value);
    };
    const navigate = useNavigate();
    const sumbitForm = async () => {
        console.log("Submit tournament: " + values.Name + " " + values.nbPlayers + " " + gametypevalue + " " + values.Gamemode);
        await API.updateTournament(values.Name, parseInt(values.nbPlayers, 10), gametypevalue, values.Gamemode, id);
        navigate('/app/mytournaments', {replace: true});
        
    }

    const deleteFunc = async () => {
        API.deleteTournament(id);
        navigate('/app/mytournaments', {replace: true});
    }

    return (
        <div>
        <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Card>
            <CardHeader
                title="Edit Tournament"
                subheader=""
            />
            <Divider />
            <CardContent>
                <Grid
                container
                spacing={3}
                >
                <Grid
                    item
                    md={8}
                    xs={4}
                >
                    <TextField
                    fullWidth
                    //helperText="Tournament Name"
                    name="Name"
                    label="Tournament Name"
                    onChange={handleChange}
                    required
                    value={values.Name}
                    variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    md={8}
                    xs={4}
                >
                    <TextField
                    fullWidth
                    name="nbPlayers"
                    label="Number of players per team"
                    onChange={handleChange}
                    required
                    value={values.nbPlayers}
                    variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    md={8}
                    xs={4}
                >
                    <TextField
                    fullWidth
                    select
                    helperText="Number of players per team"
                    name="gametypevalue"
                    onChange={handleChange2}
                    required
                    value={gametypevalue}
                    variant="outlined"
                    >
                    {gametypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                <Grid
                    item
                    md={8}
                    xs={4}
                >
                    <TextField
                    fullWidth
                    name="Gamemode"
                    label="Gamemode"
                    onChange={handleChange}
                    required
                    value={values.Gamemode}
                    variant="outlined"
                    />
                </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
            >
                <Button
                    onClick={sumbitForm}
                    color="primary"
                    variant="contained"
                >
                    Edit
                </Button>
                <Button
                    onClick={deleteFunc}
                    color="secondary"
                    variant="contained"
                >
                    Delete
                </Button>
            </Box>
            </Card>
        </form>
        </div>
    );
};

export default MyTournamentViewPage;