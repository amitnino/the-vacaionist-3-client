import React, { useState } from 'react'
import { Grid, FormControl, TextField, makeStyles, Button, FormLabel } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { SET_ALERT } from '../../reducers/actionNames';
import { useDispatch } from 'react-redux';
import ApiService from '../../api';
const useStyles = makeStyles({
    loginCon: {
        minHeight: '350px',
    }
})

const Register = ({ handleChange }) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = async (event) => {

        const data = await ApiService('POST', 'auth/register',
        {
            username,
            password,
            firstName,
            lastName
        })

        const msg = data.msg.split(']')[1]
        
        if (data.err) return dispatch({ type: SET_ALERT, payload: { severity: 'error', msg: msg } })
        dispatch({ type: SET_ALERT, payload: { severity: 'success', msg: msg } })
        setUsername('')
        setPassword('')
        setFirstName('')
        setLastName('')
        handleChange(event, 0)
    }

    const classes = useStyles()

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
                <FormControl>
                    <Grid
                        className={classes.loginCon}
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                        alignContent="center"
                        wrap="wrap"
                    >
                        <FormLabel component="legend">Please enter the following information to register</FormLabel>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                        >
                            <Grid item xs={12} md={6} >
                                <TextField
                                    id="1"
                                    label="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <TextField
                                    id="2"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                        >
                            <Grid item xs={6} >
                                <TextField
                                    id="3"
                                    label="Username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="4"
                                    label="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type='password'
                                />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={e => handleSubmit(e.target)}>
                            <CheckIcon />
                          Register
                        </Button>
                    </Grid>
                </FormControl>
            </Grid>
        </>
    )
}

export default Register
