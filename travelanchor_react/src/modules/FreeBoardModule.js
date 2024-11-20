import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_FREEBOARD = "freeboard/GET_FREEBOARD";
export const PUT_FREEBOARD = "freeboard/PUT_FREEBOARD";
export const POST_CREATE_FREEBOARD = "freeboard/POST_CREATE_FREEBOARD";
export const DEL_FREEBOARD = "freeboard/DEL_FREEBOARD";

const actions = createActions({
  [GET_FREEBOARD]: () => {},
  [PUT_FREEBOARD]: () => {},
  [POST_CREATE_FREEBOARD]: () => {},
  [DEL_FREEBOARD]: () => {},
});


const freeboardReducer = handleActions({
    [GET_FREEBOARD]: (state, { payload }) => {
        return payload;
    },
    [PUT_FREEBOARD]: (state, { payload }) => {
        return payload;
    },
    [POST_CREATE_FREEBOARD]: (state, { payload }) => {
        return payload;
    },
    [DEL_FREEBOARD]: (state, { payload }) => {
        return payload;
    }
}, initialState);

export default freeboardReducer;