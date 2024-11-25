import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_TRAVEL_DESTINATIONS = "travelDestination/GET_TRAVEL_DESTINATIONS";
export const GET_TRAVEL_DESTINATION_DETAIL = "travelDestination/GET_TRAVEL_DESTINATION_DETAIL";
export const POST_TRAVEL_DESTINATION = "travelDestination/POST_TRAVEL_DESTINATION";
export const DELETE_TRAVEL_DESTINATION = "travelDestination/DELETE_TRAVEL_DESTINATION";

const actions = createActions({
	[GET_TRAVEL_DESTINATIONS]: () => {},
	[GET_TRAVEL_DESTINATION_DETAIL]: () => {},
	[POST_TRAVEL_DESTINATION]: () => {},
	[DELETE_TRAVEL_DESTINATION]: () => {},
});

const travelDestinationReducer = handleActions({
		[GET_TRAVEL_DESTINATIONS]: (state, { payload }) => {
			return payload;
		},
		[GET_TRAVEL_DESTINATION_DETAIL]: (state, { payload }) => {
			return payload;
		},
		[POST_TRAVEL_DESTINATION]: (state, { payload }) => {
			return payload;
		},
		[DELETE_TRAVEL_DESTINATION]: (state, { payload }) => {
			return payload;
		}
}, initialState);

export default travelDestinationReducer;
