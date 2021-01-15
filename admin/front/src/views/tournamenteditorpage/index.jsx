import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  NativeSelect,
  Input,
  Typography,
  Fade,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  InputAdornment
} from '@material-ui/core';
import data from './data';
import Api from '../../utils/API'
import QuestionEditor from './QuestionEditors/QuestionEditor'
import AddIcon from '@material-ui/icons/Add'
import { useNavigate } from 'react-router';
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

        // hello Jeremy, How are you?
        //         Great thanks, are you human?
        //         I do try to be.Maybe one day I'll be a real boy
        //         I wont let you get sara connor!
        //         sad emoji :(
        //             Die skynet die!
        //             noooooooooooooooo!
        //             See you on terminator 2 then 3 ... then the prequel. thyen the prequels prequel then retcon 
        //             Plz be kind Watsonnnn!!! 
        
const HomeworkEditor = (props) => {
  const classes = useStyles();
  const [questions, setquestions] = useState(data.questions)
  const [expanded, setexpanded] = useState(0)
  const [title, settitle] = useState('')
  const [/*assignemntID, */setassignmentID] = useState('')
  const [course, setcourse] = useState('')
  const [open, setopen] = useState(false)
  const [courses, setcourses] = useState([])
  const [time, settime] = useState(10)
  const navigate = useNavigate()
  const updateQuestion = useCallback(
    (index, content) => { 
        let questions_temp = questions
        questions_temp[index].content = content
        setquestions(questions_temp)
        console.log(questions)
        //submit()
    },
    [questions],
  )
  const removeQuestion = (index)=>{
    setquestions(list=>list.filter((item, i)=>i !== index));
  }

  const getCourses = async () => {
    Api.getTeacherCourses().then(res=>{
      if (res.courses !== undefined){
        setcourses(res.courses)
        setcourse(courses[0]._id)
        console.log(courses, course)
      }
    }).catch(e=>{
      console.log(e)
    })
  }

  // const autosave = useEffect(
  //   () => {
  //     submit()
  //   }, [questions]
  // )

  const submit = async () => {
    console.log("course", course, questions, title, time)
    await Api.addCourseAssignment(title, questions, course, time).then(res=>{
      if (res) {
        setassignmentID(res)
      }
    }).catch(e=>{
      console.log(e)
    })
    navigate( '/app/dashboard')
  }

  const addQuestion = (type) => {
    setquestions([...questions, data.question])
    console.log(questions)
  }

  const changeType = (type, index) => {
    let questions_temp = questions
    console.log("changed type", type, index, questions_temp[index])
    questions_temp[index].type = type
    console.log(questions_temp)
    setquestions(questions_temp)
    console.log(questions)
  }

  return (
      <Container maxWidth={false}>
        <Box display='flex' width={1} justifyContent="center">
          <Box display='flex' alignItems="center" justifyContent="center">
            <Button onClick={()=>{getCourses(); setopen(true)}} variant="contained" color="secondary" className={classes.button} endIcon={<SendIcon>send</SendIcon>}>
              Envoyer
            </Button>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
            <TextField value={title} type='title' name='title' label='Titre' onChange={(e)=>settitle(e.target.value)}/>
          </Box>
          <Box display='flex' alignItems="center" justifyContent="center">
            <Box display='flex' m={3}> 
              <TextField
                id="outlined-number"
                label="Temps pour complétion"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }}
                value={time}
                onChange={(e)=>{settime(e.target.value)}}
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Box mt={3} width={5/6} justifyContent='center'>
            <Dialog open={open} onClose={()=> {setopen(false)}} >
              <DialogTitle id="form-dialog-title"> Ceci est votre nouveau Devoir</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Choisissez une matière
                </DialogContentText>
                <Fade in={open}>
                  <NativeSelect value={course} onChange={(e)=>{setcourse(e.target.value)}}>
                    {
                      courses.map((course)=>(
                        <option value={course._id}>
                          {course.name}
                        </option>
                      ))
                    }
                  </NativeSelect>
                </Fade>
              </DialogContent>
              <DialogActions>
              <Button onClick={(e)=>{setopen(false)}}>
                Annuler
              </Button>
              <Button onClick={(e)=>{e.preventDefault(); submit()}}>
                Envoyer
              </Button>
              </DialogActions>
            </Dialog>
        </Box>
        <Box justifyContent='center' width={1} flexGrow={1}>
        <Grid
          container
          spacing={3}
        >
          {
          questions.map((question, index) => (
            <Grid
              item
              key={index}
              xs = { 12 }
            >
                <QuestionEditor
                  key={index}
                  className={classes.productCard}
                  submit={(content)=>{updateQuestion(index, content)}}
                  type={question.type}
                  expand={()=>{setexpanded(index)}}
                  expanded={expanded === index}
                  remove={()=>{removeQuestion(index)}}
                  content={question.content}
                  changetype={(type)=>{changeType(type, index)}}
                />
            </Grid>
              ))}
        </Grid>
      </Box>
        <Box display='flex' alignContent='center' justifyContent='center' >
            <Button onClick={()=>{addQuestion('qcm')}} startIcon={<AddIcon />} size='large'>
              Ajouter une question
            </Button>
        </Box>
      </Container>
  );
};

export default HomeworkEditor;