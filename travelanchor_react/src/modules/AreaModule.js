import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_COUNTRY = "area/GET_COUNTRY";
export const GET_COUNTRY_CODE = "area/GET_COUNTRY_CODE";

const actions = createActions({
	[GET_COUNTRY]: () => {},
	[GET_COUNTRY_CODE]: () => {},
});

const areaReducer = handleActions({
	[GET_COUNTRY]: (state, { payload }) => {
		return payload;
	},
	[GET_COUNTRY_CODE]: (state, { payload }) => {
		return payload;
	}
}, initialState);

export default areaReducer;