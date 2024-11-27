import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_COMMENT = 'freeboard/GET_COMMENT'
export const PUT_COMMENT = 'freeboard/PUT_COMMENT'
export const POST_COMMENT = 'freeboard/POST_COMMENT'
export const DEL_COMMENT = 'freeboard/DEL_COMMENT'
export const SET_COMMENT = 'freeboard/SET_COMMENT'


const actions = createActions({
	[GET_COMMENT]: () => {},
	[PUT_COMMENT]: () => {},
	[POST_COMMENT]: () => {},
	[DEL_COMMENT]: () => {},
	[SET_COMMENT]: () => {},
});

const commentReducer = handleActions({
	[GET_COMMENT]: (state, { payload }) => {
        return payload;
    },
	[PUT_COMMENT]: (state, { payload }) => {
        return payload;
    },
	[POST_COMMENT]: (state, { payload }) => {
        return payload;
    },
	[DEL_COMMENT]: (state, { payload }) => {
        return payload;
    },
	[SET_COMMENT]: (state, { payload }) => {
        return payload;
    },
}, initialState);

export default commentReducer;