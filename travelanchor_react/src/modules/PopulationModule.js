import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_POPULATIONS = "population/GET_POPULATIONS";
export const GET_POPULATIONS_DETAIL = "population/GET_POPULATIONS_DETAIL";
export const PUT_POPULATIONS = "population/PUT_POPULATIONS";

const actions = createActions({
  [GET_POPULATIONS]: () => {},
  [GET_POPULATIONS_DETAIL]: () => {},
  [PUT_POPULATIONS]: () => {}
});

const populationReducer = handleActions({
    [GET_POPULATIONS]: (state, { payload }) => {
        return payload;
    },
    [GET_POPULATIONS_DETAIL]: (state, { payload }) => {
        return payload;
    },
    [PUT_POPULATIONS]: (state, { payload }) => {
        return payload;
    }
}, initialState);

export default populationReducer;