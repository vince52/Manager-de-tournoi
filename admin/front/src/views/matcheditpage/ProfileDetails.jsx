import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  makeStyles
} from '@material-ui/core';
import API from 'src/utils/API'

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [values, setValues] = useState({
    scoreleft: 0,
    scoreright: 0,
  });
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);

  const changePass = async () => {
  if (values.scoreleft && values.scoreright) {
    if (await API.updateMatch(id, parseInt(values.scoreleft), parseInt(values.scoreright)) === true) {
      console.log("test");
      setFailure(false);
      setSuccess(true);
    } else {
      console.log("test2");
      setFailure(true);
      setSuccess(false);
    }
  } else {
    console.log("test3");
    setFailure(false);
    setSuccess(false);
  }
}

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const {id} = useParams();

  const [match, setMatch] = useState({});
  const [leftteam, setleftteam] = useState({});
  const [rightteam, setrightteam] = useState({});

  useEffect(()=> {
    
    async function fetchAPI() {
        
        console.log("id: ", id)
        API.getSingleMatch(id).then(res=>{
          setMatch(res.matchs)
          setValues({scoreleft: res.matchs.left_score})
          setValues({scoreright: res.matchs.right_score})
          API.getTeam(res.matchs.left_team).then(resl=>{
            if (resl.team && resl.team[0]) {
                setleftteam(resl.team[0])
                console.log(resl.team[0])
            }
          })
          API.getTeam(res.matchs.right_team).then(resr=>{
              if (resr.team && resr.team[0])
                  setrightteam(resr.team[0])
          })
        }).catch(e=>{
            console.log(e)
        })
        
    };
    fetchAPI()
  }, []);

  function declareWinner(teamid) {
    const tournamentid = localStorage.getItem('lasttournament')
    API.setWinner(tournamentid, teamid)
    navigate('/app/tournament/' + localStorage.getItem('lasttournament'), {replace: true})
  }

  return (
    <div>
      <Collapse in={failure}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setFailure(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Error, Cannot save the new password
        </Alert>
      </Collapse>
      <Collapse in={success}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Success!
        </Alert>
      </Collapse>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title={leftteam.name + " vs " + rightteam.name}
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                Score {leftteam.name}
                <TextField
                  fullWidth
                  label=""
                  name="scoreleft"
                  onChange={handleChange}
                  required
                  value={values.scoreleft}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Score {rightteam.name}
                <TextField
                  fullWidth
                  label=""
                  name="scoreright"
                  onChange={handleChange}
                  required
                  value={values.scoreright}
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
            onClick={changePass}
              color="primary"
              variant="contained"
            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>
      <Card>
          <CardHeader
            subheader="You can select a winner here"
            title="Declare Winner"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <Button
                  onClick={() => {declareWinner(leftteam._id)}}
                    color="primary"
                    variant="contained"
                  >
                    Declare {leftteam.name} winner
                </Button>
                
                
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Button
                  onClick={() => {declareWinner(rightteam._id)}}
                    color="primary"
                    variant="contained"
                  >
                    Declare {rightteam.name} winner
                </Button>
                
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
          </Box>
        </Card>
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

        