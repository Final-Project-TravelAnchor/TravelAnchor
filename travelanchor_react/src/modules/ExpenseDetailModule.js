import { createActions, handleActions }  from "redux-actions";

const initialState = [];

export const GET_EXPENSE_DETAIL ='expenseDetail/GET_EXPENSE_DETAIL';
export const GET_EXPENSE_DETAIL_BY_CODE= 'expenseDetail/GET_EXPENSE_DETAIL_BY_CODE';
export const PUT_EXPENSE_DETAIL ='expenseDetail/PUT_EXPENSE_DETAIL';
export const POST_EXPENSE_DETAIL ='expenseDetail/POST_EXPENSE_DETAIL';
export const DELETE_EXPENSE_DETAIL = 'expenseDetail/DELETE_EXPENSE_DETAIL';

const actions = createActions({
    [GET_EXPENSE_DETAIL]: () =>{},
    [GET_EXPENSE_DETAIL_BY_CODE]: () =>{},
    [PUT_EXPENSE_DETAIL]: () =>{},
    [POST_EXPENSE_DETAIL]: () =>{},
    [DELETE_EXPENSE_DETAIL]: ()=> {}
});

const expenseDetailReducer = handleActions(
    {
        [GET_EXPENSE_DETAIL]: (state, { payload }) => payload,
        [GET_EXPENSE_DETAIL_BY_CODE]: (state, { payload }) => payload,
        [PUT_EXPENSE_DETAIL]: (state, { payload }) => payload,
        [POST_EXPENSE_DETAIL]: (state, { payload }) => payload,
        [DELETE_EXPENSE_DETAIL]: (state, { payload }) => 
            state.filter(detail => detail.expenseDetailCode !== payload), // 삭제된 항목 제거
    },
    initialState
);


export default expenseDetailReducer; 