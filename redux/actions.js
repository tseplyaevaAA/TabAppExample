export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (data) => (dispatch) => {
    dispatch({
        type: SET_USER_DATA,
        payload: data
    })
};