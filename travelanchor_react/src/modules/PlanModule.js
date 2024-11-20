import { createActions, handleActions } from "redux-actions";

const initialState = {
  startDate: null,
  endDate: null,
};

export const SET_DATE_PERIOD = "add-report/SET_DATE_PERIOD";

const actions = createActions({
  [SET_DATE_PERIOD]: (startDate, endDate) => ({ startDate, endDate }),
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
  },
  initialState
);

export default planReducer;