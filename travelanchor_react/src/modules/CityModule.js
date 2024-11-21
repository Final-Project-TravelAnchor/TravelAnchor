import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_CITY = "area/GET_CITY";
export const GET_CITY_CODE = "area/GET_CITY_CODE";

const actions = createActions({
	[GET_CITY]: () => {},
	[GET_CITY_CODE]: () => {},
});

const cityReducer = handleActions({
	[GET_CITY]: (state, { payload }) => {
		return payload;
	},
	[GET_CITY_CODE]: (state, { payload }) => {
		return payload;
	}
}, initialState);

export default cityReducer;