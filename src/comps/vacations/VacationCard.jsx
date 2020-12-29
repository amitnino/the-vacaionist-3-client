import React, { useEffect, useState } from 'react'
import { Typography, makeStyles, Card, CardHeader, CardMedia, CardActions, IconButton, Collapse, CardContent } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { LOGOUT, SET_ALERT, SET_VACATIONS_LIST } from './../../reducers/actionNames';
import { useHistory } from 'react-router-dom';
import ApiService from '../../api';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 350,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

const VacationCard = ({ info, handleEditOpen }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer)
    const classes = useStyles();

    const { title, description, price, picture, id } = info
    const start = info.start_date
    const end = info.end_date

    const [expanded, setExpanded] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)

    useEffect(() => {
        (async () => {

            const data = await ApiService('GET', 'vacations/likes', null, { 'Authorization': user.token })



            if (data.err) return console.log(data.type, data.msg)
            const like = await data.likes.find(v => v.vac_id === id)
            if (like) setIsFollowed(true)
        })()
    })

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleFollow = async () => {

        const data = await ApiService('GET', `vacations/likes/${isFollowed ? 'remove' : 'add'}/${id}`,{},{ 'Authorization': user.token })

        if (data.err) { data.type === 'token' && dispatch({ type: LOGOUT }) }
        setIsFollowed(!isFollowed)
        dispatch({ type: SET_VACATIONS_LIST, payload: data.vacations })
    }

    const handleDelete = async (id) => {

        const data = await ApiService('DELETE', `vacations/${id}`,{},{ 'Authorization': user.token })

        const msg = data.msg.split(']')[1]
        if (data.err) {
            dispatch({ type: SET_ALERT, payload: { severity: 'error', msg: msg } })
            dispatch({ type: LOGOUT })
            history.push('/')
            return
        }
        dispatch({ type: SET_ALERT, payload: { severity: 'success', msg: msg } })
        dispatch({ type: SET_VACATIONS_LIST, payload: data.vacations })
    }

    return (
        <>
            <Card className={classes.root} elevation={15}>
                <CardHeader
                    title={title}
                    subheader={`From ${start.length > 19 ? start.split('T')[0] : start} To ${end.length > 19 ? end.split('T')[0] : end}`}
                />
                <CardMedia
                    className={classes.media}
                    image={picture}
                    title="location pic"
                />
                <CardContent>
                    <Typography align='center' variant="h5" color="inherit" component="p">{price}$</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {user.role === 'user' ?
                        <IconButton aria-label="follow" color={isFollowed ? 'primary' : 'default'} onClick={handleFollow}>
                            <FavoriteIcon />
                        </IconButton>
                        :
                        <IconButton aria-label="edit vacation info" color='primary' onClick={() => handleEditOpen(info)} >
                            <EditIcon />
                        </IconButton>
                    }
                    {user.role === 'admin' &&
                        <IconButton aria-label="edit vacation info" color='secondary' onClick={() => handleDelete(info.id)} >
                            <DeleteForeverIcon />
                        </IconButton>

                    }
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{description}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    )
}

export default VacationCard
