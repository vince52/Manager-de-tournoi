import React from 'react';
import { FieldArray, Formik,} from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  // makeStyles,
  Accordion,
  AccordionSummary,
  Checkbox,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import PlusIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import {TypeSelect, MyOnChangeComponent} from './utils'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     height: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

function QCMEditor(props) {
    // const classes = useStyles();
    // const [question, setquestion] = useState('')
    // const [options, setoptions] = useState(data)
    // let boundArrayHelpers;

    // const bindArrayHelpers = (arrayHelpers) => {
    //   boundArrayHelpers = arrayHelpers
    // }
    function getAnswer(options) {
      let answer;
      options.map((item, index)=>{
        if (item.right){
          answer = index
        }
        return true
      })
      return answer
    }

    function getAnswers(options) {
      let answers = [];
      options.map((item, index)=>{
        if (item.right){
          answers.push(index)
        }
        return true
    })
      return answers
    }
    // const updateOption = (value, inletex) => {
    //     options_temp = options
    //     options_temp[index] = value
    //     setoptions(options_temp)
    // };

    // const addOption = (event) => {
    //     event.preventDefault();
    //     setoptions(...options, {content: event.target.value, right: false});
    // }

    // const setRight = (index) => {
    //     let options_temp = options.map((item, i) =>{
    //         if (i == index) {
    //             item.right = true
    //         } else {
    //             item.right = false
    //         }
    //     })
    //     setanswer(index)
    // }

    return (
        <Formik
          initialValues={{
            question: props.content.question,
            options: props.content.options,
          }}
          onSubmit={(values) => {
            if (!props.qrm) {
              let answer = getAnswer(values.options)
              props.submit({question: values.question, options: values.options, answer: answer})
            } else {
              let answers = getAnswers(values.options)
              props.submit({question: values.question, options: values.options, answers: answers})
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <MyOnChangeComponent submit={props.submit}/> 
              <Box
                display="flex"
                flexDirection="column"
                height="100%"
                width={1}
                justifyContent="center"
                onClick={props.expanded? undefined: ()=>{props.expand()}}
              >
              <Container width='sm'>
              <Accordion expanded={props.expanded}>
              <AccordionSummary>
              <Box mb={3} display='flex' width={2/3}>
                <TextField
                    label="Question"
                    name="question"
                    onChange={handleChange}
                    //type="question"
                    value={values.question}
                    variant="outlined"
                    fullWidth
                />
              </Box>
              <Box width={1/6} />
              <Box mb={3} display='flex' width={1/5}>
                <TypeSelect changeType={(type)=>{console.log(type); props.changeType(type)}} type={props.qrm?'qrm': 'qcm'} />
              </Box>
              </AccordionSummary>
              <FieldArray name='options' render={arrayHelpers=> {
                // bindArrayHelpers(arrayHelpers);
                return (
                  <div>
                {values.options.map((option, index)=>(
                <Box mb={3} key={index} display="flex"
                height="100%" width={1}>
                    <Checkbox name={`options.${index}.right`}
                              checked={values.options[index].right}
                              onChange={handleChange}
                              onClick={props.qrm? undefined: () => {
                                let options_temp = values.options
                                var i = 0
                                var right = !options_temp[index].right
                                options_temp[index].right = right
                                for (i = 0; i < options_temp.length; i++) {
                                    if (i !== index) {
                                        options_temp[i].right = !right
                                    }
                                }
                                values.options = options_temp
                                }
                              }
                              
                    >
                      Choisissez la bonne réponse
                    </Checkbox>
                    <TextField value={option.content} name={`options.${index}.content`} onChange={handleChange} variant="filled" label='Réponse' fullWidth/>
                    <Button onClick={()=>{arrayHelpers.remove(index)}} startIcon={<CloseIcon />} />
                </Box>
                )
            )}
            <Box display='flex' m={2}>
              <Box flexGrow={1}>
              <Button onClick={()=>{arrayHelpers.push({content: '', right: false})}} startIcon={<PlusIcon />} >
                Ajouter une option
              </Button>
              </Box>
              <Box>
              <Button onClick={()=>{props.remove()}} startIcon={<DeleteIcon />} />
              <Button onClick={()=>{console.log(values)}} startIcon={<PlusIcon />}/>
              </Box>
            </Box>
            </div>)}} />
            </Accordion>
            </Container>
            </Box>
            </form>
          )}
        </Formik>
    );
  };
  
//   QCMEditor.propTypes = {
//     className: PropTypes.string,
//     course: PropTypes.object.isRequired
//   };
  
  export default QCMEditor;
  