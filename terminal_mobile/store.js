import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import queryReducer from './reducer/queryReducer';
import addReducer from './reducer/addReducer';
import nav from './reducer/navReducer';
import signInReducer from './reducer/signInReducer';
import selectReducer from './reducer/selectReducer';
import historyReducer from './reducer/historyReducer';

const middleware = process.env.NODE_ENV !== 'production' ?
  //[thunk,require('redux-immutable-state-invariant').default()] :
  [thunk] :
  [thunk];

const reducer = combineReducers({queryReducer, addReducer, nav, signInReducer, selectReducer, historyReducer});

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
    status:'add',
    fetching:false,
  },
  signInReducer:{
    username:'',
    password:'',
  },
  selectReducer:{
    imageUri:'',
    height:1,
    width:1,
  },
  historyReducer:{
    history:[],
    refresh:false,
    skip:0,
    stopLoadMore:false,
  }
};

export default store = createStore(reducer, initStated, applyMiddleware(...middleware));
