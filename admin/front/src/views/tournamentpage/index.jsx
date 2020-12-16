import React from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';

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
    return (
        <Page className = { classes.root } title = "Dashboard" >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={1}
                >
                <h1>TOURNEMENT PAGE</h1>
                </Grid>
            </Container>
        </Page>
    );
};

export default Dashboard;