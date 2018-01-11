// import {createStore, combineReducers, applyMiddleware, compose}  from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import queryReducer from './reducer/queryReducer'
//
// const win = window;
//
// const reducer = combineReducers({
//   queryReducer,
// });
//
// const middlewares = [thunkMiddleware];
// if(process.env.NODE_ENV !== 'production'){
//   middlewares.push( require('redux-immutable-state-invariant').default());
// }
//
// const storeEnhancers = compose(
//   applyMiddleware(...middlewares),
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f)=>f,
// );
//
// const iniStated = {
//   queryReducer:{
//     result:[],
//     snackBarMessage:'',
//   }
// };
//
// export default createStore(reducer, iniStated, storeEnhancers)


import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import queryReducer from './reducer/queryReducer';
import addReducer from './reducer/addReducer';
import nav from './reducer/navReducer';

//for reactNative
//import { composeWithDevTools } from 'redux-devtools-extension';

// Be sure to ONLY add this middleware in development!
const middleware = process.env.NODE_ENV !== 'production' ?
  [thunk,require('redux-immutable-state-invariant').default()] :
  [thunk];

const reducer = combineReducers({queryReducer, addReducer, nav});

const initStated = {
  queryReducer:{
    result:[],
    snackBarMessage:'',
    barcode:'',
    content:'',
  },
  addReducer:{
    brand:'',
    model:'',
    TAC:'',
  }
};

// Note passing middleware as the last argument to createStore requires redux@>=3.1.0
export default store = createStore(
  reducer,initStated ,applyMiddleware(...middleware)
);
