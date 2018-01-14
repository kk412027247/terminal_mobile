import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import queryReducer from './reducer/queryReducer';
import addReducer from './reducer/addReducer';
import nav from './reducer/navReducer';
import signInReducer from './reducer/signInReducer';

const middleware = process.env.NODE_ENV !== 'production' ?
  [thunk,require('redux-immutable-state-invariant').default()] :
  [thunk];

const reducer = combineReducers({queryReducer, addReducer, nav, signInReducer});

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
  },
  signInReducer:{
    username:'',
    password:'',
  }
};

export default store = createStore(reducer, initStated, applyMiddleware(...middleware));
