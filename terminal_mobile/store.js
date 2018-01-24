import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import queryReducer from './reducer/queryReducer';
import addReducer from './reducer/addReducer';
import nav from './reducer/navReducer';
import signInReducer from './reducer/signInReducer';
import selectReducer from './reducer/selectReducer';

const middleware = process.env.NODE_ENV !== 'production' ?
  //[thunk,require('redux-immutable-state-invariant').default()] :
  [thunk] :
  [thunk];

const reducer = combineReducers({queryReducer, addReducer, nav, signInReducer, selectReducer});

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
  },
  signInReducer:{
    username:'',
    password:'',
  },
  selectReducer:{
    imageUri:'',
    height:1,
    width:1,
  }
};

export default store = createStore(reducer, initStated, applyMiddleware(...middleware));
