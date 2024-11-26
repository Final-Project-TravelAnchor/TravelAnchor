import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {

};

/* 액션 */
export const GET_MEMBER = 'member/GET_MEMBER';
export const PUT_MEMBER = 'member/PUT_MEMBER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';
export const GET_POINT = 'member/GET_POINT';


const actions = createActions({
	[GET_MEMBER]: () => {},
	[PUT_MEMBER]: () => {},
	[POST_LOGIN]: () => {},
	[POST_REGISTER]: () => {},
	[GET_POINT]: () => {},
});

/* 리듀서 */
const memberReducer = handleActions(
	{
		[GET_MEMBER]: (state, { payload }) => ({
            ...state,
            member: payload, // 기존 상태를 유지하며 member 정보 업데이트
        }),
        [PUT_MEMBER]: (state, { payload }) => ({
            ...state,
            member: payload, // 회원 정보 업데이트
        }),
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		},
		[POST_REGISTER]: (state, { payload }) => {
			return payload;
		},
		[GET_POINT]: (state, { payload }) => ({
            ...state,
            point: payload, // 기존 상태를 유지하며 point 정보 업데이트
        }),
	},
	initialState
);

export default memberReducer;
// membermodule.js