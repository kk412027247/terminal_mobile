import React from 'react';
import {Provider} from 'react-redux';
import { AppRegistry } from 'react-native';
import store from './terminal_mobile/store';
import AppWithNavigationState from './App';
const Root = ()=><Provider store={store}><AppWithNavigationState /></Provider> ;
AppRegistry.registerComponent('terminal_mobile', ()=> Root);
