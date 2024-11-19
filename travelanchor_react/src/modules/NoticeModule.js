import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_NOTICE = "notice/GET_NOTICE";
export const PUT_NOTICE = "notice/PUT_NOTICE";
export const POST_CREATE_NOTICE = "notice/POST_CREATE_NOTICE";

const actions = createActions({
  [GET_NOTICE]: () => {},
  [PUT_NOTICE]: () => {},
  [POST_CREATE_NOTICE]: () => {},
});


const noticeReducer = handleActions({
    [GET_NOTICE]: (state, { payload }) => {
        return payload;
    },
    [PUT_NOTICE]: (state, { payload }) => {
        return payload;
    },
    [POST_CREATE_NOTICE]: (state, { payload }) => {
        return payload;
    }
}, initialState);

export default noticeReducer;