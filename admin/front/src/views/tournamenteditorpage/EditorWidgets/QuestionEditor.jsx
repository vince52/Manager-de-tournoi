import React, {useState} from 'react';
// import {
//   makeStyles,
// } from '@material-ui/core';
import QCMEditor from './QCMEditor'
import FreeTextEditor from './FreeTextEditor';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     height: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

function QuestionEditor(props){
    const [type, settype] = useState(props.type)
    const changeType = (selected_type) => {
      console.log("test", selected_type)
      settype(selected_type)
      props.changetype(selected_type)
    }
    // let type_select = {<TypeSelect change_type={props.change_type} />}
    function SwitchRender (){//
        switch(type){
        case 'qcm':
            return <QCMEditor changeType={changeType} {...props} qrm={false}/>
        case 'qrm':
            return <QCMEditor changeType={changeType} {...props} qrm={true}/>
        case 'free':
            return <FreeTextEditor changeType={changeType} {...props} />
        default:
            return <h1>problème</h1>
       }
    }
    return (
        <div>
            <SwitchRender />
        </div>
        // { switch_render() }
    )
  };
  
//   QuestionEditor.propTypes = {
//     className: PropTypes.string,
//     course: PropTypes.object.isRequired
//   };
  
  export default QuestionEditor;
  