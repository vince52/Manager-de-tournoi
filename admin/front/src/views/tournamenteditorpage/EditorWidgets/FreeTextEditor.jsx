import React, {useState} from 'react';
import { Formik} from 'formik';
import {
  Box,
  Container,
  TextField,
  Accordion,
  AccordionSummary,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import {TypeSelect, MyOnChangeComponent} from './utils'


// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     height: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

const FreeTextEditor = (props) => {
    const [showHint, setshowHint] = useState(false) 
    // const [question, setquestion] = useState('')
    // const [options, setoptions] = useState(data)
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
            hint: '',
          }}
          onSubmit={(values) => {
            if (showHint) {
                props.submit({question: values.question, hint: values.hint})
            } else {
                props.submit({question: values.question})
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
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
              <Container maxWidth="lg">
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
              <Box mb={3} display='flex' width={1/5} />
              <Box mb={3} display='flex' width={1/5}>
                <TypeSelect changeType={props.changeType} type={'free'}/>
              </Box>
              </AccordionSummary>
              <Container maxWidth='sm'>
              <TextField
                  disabled={true}
                  label="Answer"
                  name="question"
                  onChange={handleChange}
                  value={values.question}
                  variant="outlined"
                  fullWidth
                />
                <Accordion expanded={showHint}>
                  <AccordionSummary>
                  <FormControlLabel value='hint' label='Add a Hint' placement='start' control={
                    <Checkbox name='showHint'
                    checked={showHint}
                    onChange={()=>{setshowHint(!showHint)}} />
                    }>
                  </FormControlLabel>
                  </AccordionSummary>
                    <TextField
                    label="Hint"
                    name="hint"
                    onChange={handleChange}
                    value={values.hint}
                    variant="outlined"
                    fullWidth
                    />
                </Accordion>
                </Container>
            </Accordion>
            </Container>
            </Box>
            </form>
          )}
        </Formik>
    );
  };
  
//   FreeTextEditor.propTypes = {
//     className: PropTypes.string,
//     course: PropTypes.object.isRequired
//   };
  
  export default FreeTextEditor;
  