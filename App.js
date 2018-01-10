import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Footer, Button, FooterTab, Icon} from 'native-base';
import {TabNavigator, addNavigationHelpers} from 'react-navigation';

import QueryPage from './terminal_mobile/queryPage/queryPage';
import Add from './terminal_mobile/addPage/add';

export const AppNavigator = TabNavigator({
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

const AppWithNavigationState = ({dispatch, nav})=>(
  <AppNavigator navigation={addNavigationHelpers({dispatch, state:nav})}/>
);

AppWithNavigationState.propTypes ={
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({nav: state.nav});

export default connect(mapStateToProps)(AppWithNavigationState);
