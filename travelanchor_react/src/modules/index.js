import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import expenseDetailReducer from './ExpenseDetailModule';
import travelReportReducer from './TravelReportModule';
import noticeReducer from './NoticeModule';
import freeboardReducer from './FreeBoardModule';
import areaReducer from './AreaModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	freeboardReducer,
	expenseDetailReducer,
	travelReportReducer,
	noticeReducer,
	areaReducer
});

export default rootReducer;