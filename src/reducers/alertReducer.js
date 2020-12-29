import { CLOSE_ALERT, SET_ALERT } from "./actionNames"

const alertInit = {
    isOpen: false,
    severity : 'info',
    msg : 'msg'
}

const alertReducer = (state = alertInit, action)=>{
    switch(action.type){
        case SET_ALERT:
            const newState = {
                isOpen: true,
                severity: action.payload.severity,
                msg: action.payload.msg
            }
            return newState
        case CLOSE_ALERT:
            return alertInit
        default:
            return state
    }
}

export default alertReducer