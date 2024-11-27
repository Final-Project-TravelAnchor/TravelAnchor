import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_TRAVEL_REPORT = 'travel-report/GET_TRAVEL_REPORT';
export const GET_TRAVEL_REPORT_DETAIL = 'travel-report/GET_TRAVEL_REPORT_DETAIL';
export const GET_TRAVEL_REPORT_BY_MEMBER_CODE = 'travel-report/GET_TRAVEL_REPORT_BY_MEMBER_CODE';
export const POST_TRAVEL_REPORT = 'travel-report/POST_TRAVEL_REPORT';
export const PUT_TRAVEL_REPORT = 'travel-report/PUT_TRAVEL_REPORT';
export const PUT_TRAVEL_REPORT_DELETION_STATUS = 'travel-report/PUT_TRAVEL_REPORT_DELETION_STATUS';

const actions = createActions({
	[GET_TRAVEL_REPORT]: () => {},
	[GET_TRAVEL_REPORT_DETAIL]: () => {},
	[POST_TRAVEL_REPORT]: () => {},
	[PUT_TRAVEL_REPORT]: () => {},
	[PUT_TRAVEL_REPORT_DELETION_STATUS]: () => {},
	[GET_TRAVEL_REPORT_BY_MEMBER_CODE]: () => {}
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
		},
		[GET_TRAVEL_REPORT_BY_MEMBER_CODE]: (state, { payload }) => {
			if (!payload || payload.length === 0) {
				console.log("[리듀서] payload가 비어 있습니다.");
				return state; // 기존 상태 유지
			}
			console.log("[리듀서] 상태 업데이트 성공:", payload);
			return [...state, ...payload]; // 기존 상태와 새로운 데이터를 병합
		}
		
	},
	initialState
);

export default travelReportReducer;
