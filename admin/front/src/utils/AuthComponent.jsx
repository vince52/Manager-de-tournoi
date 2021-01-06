import React, {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import API from './API'

const AuthComponent = (props) => {
    const [isAuth, setisAuth] = useState(undefined)
    useEffect(()=> {
        async function fetchApi() {
            await API.isConnected().then(res=>{
                console.log("log", res)
                if (res === true) {
                    console.log("log", res)
                    setisAuth(true)
                    return true
                } else {
                    setisAuth(false)
                }
                return false
                }).catch(e=>{
                    console.log(e)
                    setisAuth(false)
                })
        }
        fetchApi();
    }, [])
        if (isAuth) {
            return (<Navigate to="/app/browser" />)
        } else if (isAuth !== undefined) {
            return (<Navigate to="/login" />)
        } else {
            return (<CircularProgress />)
        }
        //return (<div>{isAuth? <div>{props.children}</div>:<LoginView />}</div>)
}

export default AuthComponent