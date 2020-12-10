import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink} from 'react-router-dom';
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
import { ThemeProvider } from '@material-ui/core/styles';
//import { green, purple, blue, lightBlue } from '@material-ui/core/colors';
import Api from '../../../utils/API';
import {theme, themeHeader, useStyles } from '../styles';
//import { useHref } from 'react-router';

const Assignment = ({ className, ...rest }) => {
  const classes = useStyles();
  const [assignments, setassignments] = useState([])
    useEffect(() => {
      async function fetchApi() {
        Api.getUserAssignments().then(res=>{
          console.log(res)
          if (res) {
            setassignments(res)
            //console.log("res: ", res);
          }
        }).catch(e=>{
          console.log(e)
        })
      }
      //console.log(className)
      fetchApi()
    }, [className])
  return (
    
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <List className={classes.ListHeader} subheader={<li />}>
          {/* {[0].map((sectionId, index) => (
            <li key={`section-${sectionId}`} className={classes.listSection}>
              <ul className={classes.ul}> */}
              <ThemeProvider theme={themeHeader}>
                <ListSubheader>{`Assignments`}</ListSubheader>
              </ThemeProvider>
                {assignments.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${item.subject}`} secondary={`${item.name}`} />
                  </ListItem>
                ))}
              {/* </ul>
            </li>
          ))} */}
        </List>
      <Box p = {1}> </Box>
      <Grid container spacing ={2} justify="flex-end" component={RouterLink} to='/app/courses'>
          <ThemeProvider theme={theme}>
            <Button variant = "contained" color = "primary" className={clsx(classes.buttonDesign, className)} > 
              See More
            </Button>
          </ThemeProvider>
      </Grid>
      </CardContent>
    </Card>
    
  );
};

Assignment.propTypes = {
  className: PropTypes.string
};

export default Assignment;