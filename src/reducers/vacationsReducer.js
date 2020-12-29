import {SET_VACATIONS_LIST} from './actionNames'

const initVacations = []

const vacationsReducer = (state = initVacations, action) =>{
    switch(action.type){
        case SET_VACATIONS_LIST:
            const newState = action.payload
            return newState
        default:
            return state

    }
}

export default vacationsReducer