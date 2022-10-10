//import { TASK_FILTER_TYPE } from "../tae_app/utility/constants";
import { SET_TASK_TYPE } from "./actions";

const initialState = {
    taskType: 'HI'
}

const taskTypeReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_TASK_TYPE:
            return {
                ...state,
                taskType: actions.payload
            }

        default:
            return state
    }
}

export default taskTypeReducer;
