import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ACTIVITY = "activity/GET_ACTIVITY";
export const PUT_ACTIVITY = "activity/PUT_ACTIVITY";
export const POST_CREATE_ACTIVITY = "activity/POST_CREATE_ACTIVITY";
export const DEL_ACTIVITY = "activity/DEL_ACTIVITY";

const actions = createActions({
  [GET_ACTIVITY]: () => {},
  [PUT_ACTIVITY]: () => {},
  [POST_CREATE_ACTIVITY]: () => {},
  [DEL_ACTIVITY]: () => {},
});


const activityReducer = handleActions({
    [GET_ACTIVITY]: (state, { payload }) => {
        return payload;
    },
    [PUT_ACTIVITY]: (state, { payload }) => {
        return payload;
    },
    [POST_CREATE_ACTIVITY]: (state, { payload }) => {
        return payload;
    },
    [DEL_ACTIVITY]: (state, { payload }) => {
        return payload;
    }
}, initialState);

export default activityReducer;