import React from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import Title from './DashboardView/Title';

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

    return ( 
        <Page className = { classes.root } title = "Dashboard" >

            <Container  maxWidth = { false }>
            <Grid container spacing = { 3 } >
                <Grid item 
                lg = { 12 }
                sm = { 12 }
                xl = { 12 }
                xs = { 12 } >
                    <Title />
                </Grid>
                <Grid item 
                    xs = { 12 } 
                    sm = { 6 }
                    md = { 4 }
                    lg = { 3 } 
                    xl = { 3 } >
                </Grid>
                <Grid item
                    xs = { 12 } 
                    sm = { 6 }
                    md = { 4 }
                    lg = { 3 } 
                    xl = { 3 } >
                </Grid>
                <Grid item
                    xs = { 12 } 
                    sm = { 6 }
                    md = { 4 }
                    lg = { 3 } 
                    xl = { 3 } >
                </Grid>
                <Grid item
                    xs = { 12 } 
                    sm = { 6 }
                    md = { 4 }
                    lg = { 3 } 
                    xl = { 3 } >
                </Grid>

                <Grid item 
                    xs = { 12 } 
                    sm = { 6 }
                    md = { 4 }
                    lg = { 3 } 
                    xl = { 3 } >
                </Grid> 
            </Grid> 
        </Container> 
        </Page>
    );
};

export default Dashboard;