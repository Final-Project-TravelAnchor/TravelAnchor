import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_POPULATIONS = "population/GET_POPULATIONS";

const actions = createActions({
  [GET_POPULATIONS]: () => {}
});

const populationReducer = handleActions({
    [GET_POPULATIONS]: (state, { payload }) => {
        return payload;
    }
}, initialState);

export default populationReducer;