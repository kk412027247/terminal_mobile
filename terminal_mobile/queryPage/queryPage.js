import React from 'react';
import {StackNavigator} from 'react-navigation';
import Query from './query';
import Camera from './camera';

export default StackNavigator({
  query:{screen: Query},
  camera:{screen: Camera}
},{
  headerMode:'none',
});
