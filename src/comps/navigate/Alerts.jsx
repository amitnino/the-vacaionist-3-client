import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_ALERT } from '../../reducers/actionNames';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Alerts() {

    const dispatch = useDispatch()
    const alert = useSelector(state => state.alertReducer)

    return (
        <Snackbar open={alert.isOpen} autoHideDuration={6000} onClose={()=>dispatch({type:CLOSE_ALERT})}>
            <Alert onClose={()=>dispatch({type:CLOSE_ALERT})} severity={alert.severity}>
                {alert.msg}
            </Alert>
        </Snackbar>
    )
}

export default Alerts
