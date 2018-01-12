import React from 'react';
//Root 是 nativeBase 的框架，用来做下方弹窗用的包裹组件，包在导航条的最外围
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import { AppRegistry } from 'react-native';
import store from './terminal_mobile/store';
import AppWithNavigationState from './App';

const _Root = ()=>(
  <Provider store={store}><Root><AppWithNavigationState /></Root></Provider>
) ;
AppRegistry.registerComponent('terminal_mobile', ()=> _Root);
