import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_TRAVEL_REPORT = 'travel-report/GET_TRAVEL_REPORT';
export const GET_TRAVEL_REPORT_DETAIL = 'travel-report/GET_TRAVEL_REPORT_DETAIL';
export const POST_TRAVEL_REPORT = 'travel-report/POST_TRAVEL_REPORT';
export const PUT_TRAVEL_REPORT = 'travel-report/PUT_TRAVEL_REPORT';
export const PUT_TRAVEL_REPORT_DELETION_STATUS = 'travel-report/PUT_TRAVEL_REPORT_DELETION_STATUS';

const actions = createActions({
	[GET_TRAVEL_REPORT]: () => {},
	[GET_TRAVEL_REPORT_DETAIL]: () => {},
	[POST_TRAVEL_REPORT]: () => {},
	[PUT_TRAVEL_REPORT]: () => {},
	[PUT_TRAVEL_REPORT_DELETION_STATUS]: () => {}
});

/* 리듀서 */
const travelReportReducer = handleActions(
	{
		[GET_TRAVEL_REPORT]: (state, { payload }) => {
			return payload;
		},
		[GET_TRAVEL_REPORT_DETAIL]: (state, { payload }) => {
			return payload;
		},
		[POST_TRAVEL_REPORT]: (state, { payload }) => {
			return payload;
		},
		[PUT_TRAVEL_REPORT]: (state, { payload }) => {
			return payload;
		},
		[PUT_TRAVEL_REPORT_DELETION_STATUS]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default travelReportReducer;
