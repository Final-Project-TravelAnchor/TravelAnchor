import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import expenseDetailReducer from './ExpenseDetailModule';
import travelReportReducer from './TravelReportModule';
import noticeReducer from './NoticeModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	expenseDetailReducer,
	travelReportReducer,
	noticeReducer
});

export default rootReducer;