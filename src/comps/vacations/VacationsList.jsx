import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, SET_ALERT, SET_VACATIONS_LIST } from '../../reducers/actionNames';
import { useHistory } from 'react-router-dom';
import VacationCard from './VacationCard';
import { Grid, Box, Dialog, IconButton } from '@material-ui/core'
import VacationForm from './VacationForm';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ApiService from '../../api';

const VacationsList = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const searchReducer = useSelector(state => state.searchReducer)
    const user = useSelector(state => state.authReducer)
    const vacations = useSelector(state => state.vacationsReducer)
    const [openEdit, setOpenEdit] = useState(false)
    const [vacationInfo, setVacationInfo] = useState(undefined)

    useEffect(() => {
        (async () => {

            const path = `vacations${searchReducer && '/search'}`

            const data = await ApiService('GET', path ,null,{ 'Authorization': user.token })

            if (data.err) {
                const msg = data.msg.split(']')[1]
                dispatch({ type: LOGOUT })
                dispatch({ type: SET_ALERT, payload: { severity: 'error', msg: msg } })
                history.push('/')
                return
            }
            dispatch({ type: SET_VACATIONS_LIST, payload: [...data.vacations] })
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchReducer])

    const handleEditOpen = (info) => {
        setOpenEdit(true)
        info ? setVacationInfo(info) : setVacationInfo(undefined)
    }

    const handleEditClose = () => {
        setOpenEdit(false)
    }

    return (
        <>
            <Box
                component={Grid}
                container
                style={{ width: '100%' }}
                spacing={2}
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
                wrap="wrap"
            >
                {user.role === 'admin' &&
                    <Grid item sm={12} md={2} lg={1} container
                        style={{ height: '500px' }}
                        direction="row"
                        justify="center"
                        alignItems="center" >
                        <IconButton aria-label="add new vacation" onClick={handleEditOpen}>
                            <AddCircleRoundedIcon style={{ fontSize: 100, color: 'white' }} />
                        </IconButton>
                    </Grid>}
                {vacations.map(v => {
                    return (
                        <Grid key={v.id + 'grid-item'} item xs={12} sm={8} md={6} lg={3} container
                            direction="row"
                            justify="space-evenly"
                            alignItems="flex-start">
                            <VacationCard key={v.id} info={v} handleEditOpen={handleEditOpen} />
                        </Grid>
                    )
                })}

                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    maxWidth='md'
                >
                    <VacationForm info={vacationInfo} handleEditClose={handleEditClose} />
                </Dialog>
            </Box>
            <Box style={{ height: '70px' }} />
        </>
    )
}

export default VacationsList
