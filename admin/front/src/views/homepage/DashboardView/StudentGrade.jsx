import React/*, {useState, useEffect}*/ from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import MoneyIcon from '@material-ui/icons/Money';
// import TextField from '@material-ui/core/TextField';
import { ThemeProvider/*, createMuiTheme, createTypography */} from '@material-ui/core/styles';
// import { green, purple, blue, lightBlue } from '@material-ui/core/colors';
// import Api from '../../../utils/API';
import {theme, themeHeader, useStyles } from '../styles';

const StudentGrade = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <List className={classes.ListHeader} subheader={<li />}>
          {/* {[0].map((sectionId) => (
            <li key={`section-${sectionId}`} className={classes.listSection}>
              <ul className={classes.ul}> */}
              <ThemeProvider theme={themeHeader}>
                <ListSubheader>{`Grades`}</ListSubheader>
              </ThemeProvider>
                {[0, 1, 2].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${item}`} secondary={`${item}`} />
                  </ListItem>
                ))}
              {/* </ul>
            </li>
          ))} */}
        </List>
      <Box p = {1}> </Box>
      <Grid container spacing ={2} justify="flex-end">
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

StudentGrade.propTypes = {
  className: PropTypes.string
};

export default StudentGrade;