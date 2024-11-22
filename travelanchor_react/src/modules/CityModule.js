import { createActions, handleActions } from "redux-actions";

const initialState = [];

// const initialSelectedCityCode = null;

export const GET_CITY = "area/GET_CITY";
export const GET_CITY_CODE = "area/GET_CITY_CODE";
export const SET_SELECTED_CITY = "addReport/SET_SELECTED_CITY"

const actions = createActions({
	[GET_CITY]: () => {},
	[GET_CITY_CODE]: () => {},
	[SET_SELECTED_CITY]: () => {}
});

const cityReducer = handleActions({
	[GET_CITY]: (state, { payload }) => {
		return payload;
	},
	[GET_CITY_CODE]: (state, { payload }) => {
		return payload;
	}
}, initialState);

const selectedCityReducer = handleActions({
	[SET_SELECTED_CITY]: (state, { payload }) => {
		console.log("payload: ", payload);
		return payload;
	}
}, null);

export { cityReducer, selectedCityReducer} ;