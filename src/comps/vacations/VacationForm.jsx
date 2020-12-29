import React, { useState } from 'react'
import { TextField, DialogContent, DialogActions, Button } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, SET_ALERT, SET_VACATIONS_LIST } from './../../reducers/actionNames';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import ApiService from '../../api';
moment().format()


const VacationForm = ({ info, handleEditClose }) => {

    const user = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const history = useHistory()

    const id = info && info.id

    const [title, setTitle] = useState(!info ? '' : info.title)
    const [description, setDescription] = useState(!info ? '' : info.description)
    const [price, setPrice] = useState(!info ? '' : info.price)
    const [picture, setPicture] = useState(!info ? '' : info.picture)
    const [start, setStart] = useState(!info ? Date.now() : moment(info.start_date))
    const [end, setEnd] = useState(!info ? Date.now() + 1000 * 60 * 60 * 24 * 7 : moment(info.end_date))

    const handleEditSubmit = async () => {

        const data = await ApiService('POST', 'vacations/edit',
            {
                id,
                title,
                description,
                price,
                picture,
                start_date: start,
                end_date: end
            },
            { 'Authorization': user.token })

 

        if (data.err) return console.log(data.type, data.msg)
        console.log(data.msg)
        dispatch({ type: SET_VACATIONS_LIST, payload: data.vacations })
        handleEditClose()
    }

    const handleAddSubmit = async () => {
        
        const data = await ApiService('POST', 'vacations/add',
            {
                title,
                description,
                price,
                picture,
                start_date: start,
                end_date: end
            },
            { 'Authorization': user.token })

         

        const msg = data.msg.split(']')[1]
        if (data.err) {
            dispatch({ type: SET_ALERT, payload: { severity: 'error', msg: msg } })
            dispatch({ type: LOGOUT })
            history.push('/')
            return
        }
        dispatch({ type: SET_ALERT, payload: { severity: 'success', msg: msg } })
        dispatch({ type: SET_VACATIONS_LIST, payload: data.vacations })
        handleEditClose()
    }


    return (
        <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="title"
                        label="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        multiline
                        id="description"
                        label="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type='number'
                        id="price"
                        label="Price -- $"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="picture"
                        label="Picture"
                        value={picture}
                        onChange={e => setPicture(e.target.value)}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        fullWidth
                        variant="inline"
                        format="DD/MM/yyyy"
                        margin="normal"
                        id="date-picker-start"
                        label="Starting Date"
                        value={start}
                        onChange={date => setStart(moment(date).format('DD/MM/yyyy'))}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        fullWidth
                        margin="normal"
                        variant="inline"
                        format="DD/MM/yyyy"
                        id="date-picker-end"
                        label="End Date"
                        value={end}
                        onChange={date => setEnd(moment(date).format('DD/MM/yyyy'))}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    {
                        id ?
                            <Button onClick={handleEditSubmit} color="primary">
                                Submit
                            </Button>
                            :
                            <Button onClick={handleAddSubmit} color="primary">
                                Add
                            </Button>
                    }
                </DialogActions>
            </MuiPickersUtilsProvider>
        </>
    )
}

export default VacationForm
