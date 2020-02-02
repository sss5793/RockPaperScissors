// create store
import { createStore, applyMiddleware } from 'redux';

//log
import { logger } from 'redux-logger';

import ReduxThunk from 'redux-thunk';

// reducer
import rootReducer from './modules';

// const logger = createLogger();
export const store = createStore(rootReducer, applyMiddleware(logger,ReduxThunk));
