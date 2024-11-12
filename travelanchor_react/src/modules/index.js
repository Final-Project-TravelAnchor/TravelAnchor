import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import populationReducer from './PopulationModule';

const rootReducer = combineReducers({
	memberReducer,
	populationReducer
});

export default rootReducer;