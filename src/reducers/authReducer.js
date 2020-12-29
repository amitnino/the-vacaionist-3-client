import {LOGIN, LOGOUT} from './actionNames'
import ApiService from '../api'

const initUser = {
    isLoggedIn: false,
    id: null,
    name: null,
    role: null,
    token: null
}

const authReducer = (state = initUser, action)=>{
    switch (action.type){
        case LOGIN:
            const newState = {
                isLoggedIn: true,
                token: action.payload.token,
                role: action.payload.role,
                id: action.payload.id,
                fname: action.payload.fname,
                lname: action.payload.lname
            }
            return newState
        case LOGOUT:
            ApiService('POST', 'auth/logout' ,{token:state.token})
            return initUser
        default:
            return state
    }
}

export default authReducer