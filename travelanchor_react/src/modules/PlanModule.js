import { createActions, handleActions } from "redux-actions";

const initialState = {
  startDate: null,
  endDate: null,
  totalDate: null,
  dayNumber: null,
};

export const SET_DATE_PERIOD = "add-report/SET_DATE_PERIOD";
export const SET_TOTAL_DATE = "add-plan/SET_TOTAL_DATE";
export const SET_DAY_NUMBER = "add-plan/SET_DAY_NUMBER";

const actions = createActions({
  [SET_DATE_PERIOD]: (startDate, endDate) => ({ startDate, endDate }),
  [SET_TOTAL_DATE]: () => ({}),
  [SET_DAY_NUMBER]: () => ({})
});

const planReducer = handleActions(
  {
    [SET_DATE_PERIOD]: (state, { payload }) => {
        // console.log(state);
        // console.log(payload);
      return {
        ...state,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };
    },
    [SET_TOTAL_DATE]: (state, { payload }) => {
			return { 
        ...state,
        totalDate: payload.totalDate,
		};
    },
    [SET_DAY_NUMBER]: (state, { payload }) => {
      return { 
        ...state,
        dayNumber: payload.dayNumber,
    };
    },
},
  initialState
);

export default planReducer;