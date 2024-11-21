import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import expenseDetailReducer from './ExpenseDetailModule';
import travelReportReducer from './TravelReportModule';
import noticeReducer from './NoticeModule';
import freeboardReducer from './FreeBoardModule';
import areaReducer from './AreaModule';
import planReducer from './PlanModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	freeboardReducer,
	expenseDetailReducer,
	travelReportReducer,
	noticeReducer,
	areaReducer,
	planReducer,
});

export default rootReducer;