// import rootReducer from './modules';
// import { composeWithDevTools} from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(ReduxThunk))
// );

// export default store;
// store

import { configureStore, createSlice } from '@reduxjs/toolkit';
import rootReducer from './modules'; 

const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;