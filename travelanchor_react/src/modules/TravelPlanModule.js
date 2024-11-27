import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_TRAVELPLAN = "travlePlan/GET_TRAVELPLAN";
export const GET_TRAVELPLAN_DETAIL = "travelPlan/GET_TRAVELPLAN_DETAIL";
export const PUT_TRAVELPLAN = "travelPlan/PUT_TRAVELPLAN";
export const POST_TRAVELPLAN = "travelPlan/POST_RRAVELPLAN";
export const PUT_TRAVEL_PLAN_DELETION_STATUS = "travelPlan/PUT_TRAVEL_PLAN_DELETION_STATUS"
export const POST_TRAVEL_DAY = "travelDay/POST_TRAVEL_DAY";
export const GET_TRAVEL_DAY = "travelDay/GET_TRAVEL_DAY";

const actions = createActions({
	[GET_TRAVELPLAN]: () => {},
	[GET_TRAVELPLAN_DETAIL]: () => {},
	[PUT_TRAVELPLAN]: () => {},
	[POST_TRAVELPLAN]: () => {},
	[PUT_TRAVEL_PLAN_DELETION_STATUS]: () => {},
	[POST_TRAVEL_DAY]: () => {},
});

const travelPlanReducer = handleActions({
	[GET_TRAVELPLAN]: ( state, { payload }) => {
		return payload
	},
	[GET_TRAVELPLAN_DETAIL]: (state, { payload }) => {
        return payload;
    },
    [PUT_TRAVELPLAN]: (state, { payload }) => {
        return payload;
    },
    [POST_TRAVELPLAN]: (state, { payload }) => {
        return payload;
    },
    [GET_TRAVEL_DAY]: (state, { payload }) => {
        return payload;
    },
	[PUT_TRAVEL_PLAN_DELETION_STATUS]: (state, { payload }) => {
        return payload;
    }
}, initialState);

const travelDayReducer = handleActions({
    [GET_TRAVEL_DAY]: (state, { payload }) => {
        return payload;
    },
    [POST_TRAVEL_DAY]: (state, { payload }) => {
        return payload;
    }
}, initialState);

export {travelPlanReducer, travelDayReducer};

