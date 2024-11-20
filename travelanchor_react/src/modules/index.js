import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';
import noticeReducer from './NoticeModule';
import freeboardReducer from './FreeBoardModule';


const rootReducer = combineReducers({
	memberReducer,
	populationReducer,
	noticeReducer,
	freeboardReducer,
});

export default rootReducer;