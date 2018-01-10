import React from 'react';
import {Provider} from 'react-redux';
import {Footer, Button, FooterTab, Icon} from 'native-base';
import { AppRegistry } from 'react-native';
import store from './terminal_mobile/store';
import {TabNavigator, addNavigationHelpers} from 'react-navigation';
import QueryPage from './terminal_mobile/queryPage/queryPage';
import Add from './terminal_mobile/addPage/add';

const MainScreenNavigator = TabNavigator({
  query:{screen: QueryPage},
  add:{screen: Add},
},{
  tabBarPosition:'bottom',
  //开启切换动画，默认IOS没动画
  //animationEnabled:true,
  //自定义底部组件
  tabBarComponent: props =>(
    <Footer>
      <FooterTab>
        <Button
          active={props.navigationState.index === 0}
          onPress = {()=>props.navigation.navigate('query')}
          title={''}
        >
          <Icon name={'ios-search'}/>
        </Button>
        <Button
          active={props.navigationState.index === 1}
          onPress = {()=>props.navigation.navigate('add')}
          title={''}
        >
          <Icon name={'ios-create-outline'}/>
        </Button>
      </FooterTab>
    </Footer>
  )
});

//const NavigatorWithRedux = (dispatch, nav)=>()


const Instance = ()=><Provider store={store}><MainScreenNavigator /></Provider> ;
AppRegistry.registerComponent('terminal_mobile', ()=> Instance);
