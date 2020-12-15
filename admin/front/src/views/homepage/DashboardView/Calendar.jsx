//import React, {useState, useEffect} from 'react';
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid,
  Button,
  CardContent
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import MoneyIcon from '@material-ui/icons/Money';
// import TextField from '@material-ui/core/TextField';
//import { createMuiTheme, ThemeProvider, createTypography } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
// import { green, purple, blue, lightBlue } from '@material-ui/core/colors';
// import Api from '../../../utils/API';

import {theme, themeHeader, useStyles, themeCalendar} from '../styles';
//import {themeHeader, useStyles } from '../styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ExposureIcon from '@material-ui/icons/Exposure';
import TranslateIcon from '@material-ui/icons/Translate';
import HistoryIcon from '@material-ui/icons/History';


const StudentCalendar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      justify="flex-end"
    >
      <CardContent>
          <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ThemeProvider theme={themeHeader}>
              <ListSubheader  align = "center" component="div" id="nested-list-subheader">
                Calendar
              </ListSubheader>
            </ThemeProvider>
          }
        >
        <ThemeProvider theme={themeCalendar} >
          <ListItem className={classes.CalendertextMath} >
          <ListItemAvatar>
                <Avatar>
                  <ExposureIcon />
                </Avatar>
              </ListItemAvatar>
            <ListItemText primary="Math" secondary="10h-12h" />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem className={classes.CalendertextEnglish}>
              <ListItemAvatar>
                <Avatar>
                  <FastfoodIcon />
                </Avatar>
              </ListItemAvatar>
            <ListItemText primary="Pause déjeuner" secondary="12h-13h" />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem className={classes.CalendertextEnglish}>
            <ListItemAvatar>
                <Avatar>
                  <TranslateIcon />
                </Avatar>
              </ListItemAvatar>
            <ListItemText primary="Français" secondary="13h-14h" />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem className={classes.CalendertextEnglish}>
            <ListItemAvatar>
                <Avatar>
                  <HistoryIcon />
                </Avatar>
              </ListItemAvatar>
            <ListItemText primary="Histoire" secondary="14h05-16h" />
          </ListItem>
        </ThemeProvider>
      </List>
      <Grid container justify="flex-end">
          <ThemeProvider theme={theme}>
            <Button variant = "contained" color = "primary" className={clsx(classes.buttonDesign, className)}> 
              See More
            </Button>
            </ThemeProvider>
      </Grid>
      </CardContent>
    </Card>
  );
};

StudentCalendar.propTypes = {
  className: PropTypes.string
};

export default StudentCalendar;
