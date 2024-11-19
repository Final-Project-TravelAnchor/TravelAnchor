import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import noticeReducer from './NoticeModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	noticeReducer
});

export default rootReducer;