import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_TRAVELPLAN = "travlePlan/GET_TRAVELPLAN";
export const GET_TRAVELPLAN_DETAIL = "travelPlan/GET_TRAVELPLAN_DETAIL";
export const PUT_TRAVELPLAN = "travelPlan/PUT_TRAVELPLAN";
export const POST_TRAVELPLAN = "travelPlan/POST_RRAVELPLAN";
export const PUT_TRAVEL_PLAN_DELETION_STATUS = "travelPlan/PUT_TRAVEL_PLAN_DELETION_STATUS"

const actions = createActions({
	[GET_TRAVELPLAN]: () => {},
	[GET_TRAVELPLAN_DETAIL]: () => {},
	[PUT_TRAVELPLAN]: () => {},
	[POST_TRAVELPLAN]: () => {},
	[PUT_TRAVEL_PLAN_DELETION_STATUS]: () => {},
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
	[PUT_TRAVEL_PLAN_DELETION_STATUS]: (state, { payload }) => {
        return payload;
    }
}, initialState);

export default travelPlanReducer;

