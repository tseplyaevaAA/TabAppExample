import { SET_USER_DATA } from "./actions";

const initialState = {
    userData: ''
}

const userDataReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: actions.payload
            }

        default:
            return state
    }
}

export default userDataReducer;
