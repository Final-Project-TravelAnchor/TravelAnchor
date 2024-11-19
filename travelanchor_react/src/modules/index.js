import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import expenseDetailReducer from './ExpenseDetailModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	expenseDetailReducer
});

export default rootReducer;