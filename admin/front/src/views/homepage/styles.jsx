//import React, {useState, useEffect} from 'react';
//import clsx from 'clsx';
//import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
//import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
//import MoneyIcon from '@material-ui/icons/Money';
//import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
//import Api from '../../utils/API';


export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    //boxShadow: 3,
    borderRadius: 10,
    boxShadow: '0 3px 14px 10px rgba(44, 39, 56, .05)',
    background: '#ffffff',
  },
  buttonDesign: {
    height: '100%',
    boxShadow: 3,
    borderRadius: 20,
    //background: '#92C7E8',
    //backgroundColor: 'linear-gradient(45deg, #2286e3 30%, #7fb7eb 90%)',
  },
  ListHeader: {
    fontSize: 30,
    textAlign: "center",
  },
  CalendertextMath: {
    boxShadow: 3,
    fontSize: 30,
    borderRadius: 10,
  },
  CalendertextEnglish: {
    boxShadow: 3,
    fontSize: 30,
  },
  CalenderWidget: {
    height: '100%',
    //boxShadow: 3,
    borderRadius: 10,
    boxShadow: '0 3px 14px 10px rgba(44, 39, 56, .05)',
    background: 'linear-gradient(45deg, #2286e3 30%, #7fb7eb 90%)',
  }
}));

export const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
      }
    }
  }
});

export const themeHeader = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
  typography: {
    fontSize: 35,
    fontFamily: [
      'Roboto',
    ].join(','),
  }
});

export const themeCalendar = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
  typography: {
    fontSize: 20,
    fontFamily: [
      'Roboto',
    ].join(','),
  }
});