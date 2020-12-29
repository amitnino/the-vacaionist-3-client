import { SEARCH } from "./actionNames"

const searchReducer = (state = '', action)=>{
    switch (action.type){
        case SEARCH:
            const newState = action.payload
            console.log(newState);
        return newState
        default:
            return state
    }
}

export default searchReducer