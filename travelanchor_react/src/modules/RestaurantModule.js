import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_FAVORITE = 'restaurant/GET_FAVORITE';

const actions = createActions({
	[GET_FAVORITE]: () => {},
});

const restaurantReducer = handleActions(
    {
		[GET_FAVORITE]: (state, { payload }) => {
            return payload;
        }
	},
	initialState
);

export default restaurantReducer;