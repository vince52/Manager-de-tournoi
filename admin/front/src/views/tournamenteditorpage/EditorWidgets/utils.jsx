import React, {useState, useEffect, useCallback} from 'react';
import {NativeSelect} from '@material-ui/core'
import data from '../data'
import {useFormikContext} from 'formik'
export function TypeSelect(props){
    const [type, settype] = useState(props.type)
    const changeType = (e) => {
      console.log("change type", e.target.value)
      settype(e.target.value)
      props.changeType(e.target.value)
    }
    return (<NativeSelect value={type} onChange={changeType}>
              {data.types.map((type, index)=>(
                <option key={index} value={type.value}>
                  {type.name}
                </option>
              ))}
            </NativeSelect>)
  }

export const MyOnChangeComponent = (props) => {
    const { values } = useFormikContext();
    const submit = useCallback(
      (values)=> {
        props.submit(values)
      }, [props])
    useEffect(() => {
      console.log('changed', values);
      submit(values)
    }, [values, submit]);
  
    return null;
  }