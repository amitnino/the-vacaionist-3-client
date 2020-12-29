import React, { useState } from 'react'
import { Grid, makeStyles, TextField, FormControl, FormLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PowerIcon from '@material-ui/icons/Power';
import { decodeToken } from "react-jwt";
import { LOGIN, SET_ALERT } from '../../reducers/actionNames'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import ApiService from '../../api';

const useStyles = makeStyles({
    loginCon: {
        minHeight: '350px',
    }
})
const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {

        const data = await ApiService('POST', 'auth/login', { username, password })

        if (data.err) return dispatch({ type: SET_ALERT, payload: { severity: 'error', msg: data.msg.split(']')[1] } })
        
        const { role, id, first_name, last_name } = await decodeToken(data.accessToken)
        await dispatch({
            type: LOGIN, payload: {
                token: data.accessToken,
                fname: first_name,
                lname: last_name,
                role,
                id
            }
        })
        history.push("/")
    }

    return (
        <>
            <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
            >
                <FormControl component={Grid}>
                    <Grid
                        className={classes.loginCon}
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                        alignContent="center"
                        wrap="wrap"
                    >
                        <FormLabel component="legend">Enter Username & Password</FormLabel>
                        <Grid item xs={12} >
                            <TextField
                                id="1"
                                label="USERNAME"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="2"
                                label="PASSWORD"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                            />
                        </Grid>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            <PowerIcon />
                            Login
                        </Button>
                    </Grid>
                </FormControl>
            </Grid>
        </>
    )
}

export default Login
