import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_COUNTRY = "area/GET_COUNTRY";
export const GET_CITY = "area/GET_CITY";

const actions = createActions({
	[GET_COUNTRY]: () => {},
	[GET_CITY]: () => {}
});

const areaReducer = handleActions({
	[GET_COUNTRY]: (state, { payload }) => {
		return payload;
	},
	[GET_CITY]: (state, { payload }) => {
		return payload;
	}
}, initialState);

export default areaReducer;