import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import travelReportReducer from './TravelReportModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	travelReportReducer
});

export default rootReducer;