import {combineReducers} from 'redux';

import {reducer as configReducer} from './config';
import {reducer as recordReducer} from './record';
// import { reducer as uploadReducer } from './upload';

const rootReducer = combineReducers({
  config: configReducer,
  record: recordReducer,
  // upload: uploadReducer,
});

export default rootReducer;
