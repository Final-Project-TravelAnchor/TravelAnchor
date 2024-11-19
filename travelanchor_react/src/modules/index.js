import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import travelReportReducer from './TravelReportModule';
import noticeReducer from './NoticeModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	travelReportReducer,
	noticeReducer
});

export default rootReducer;