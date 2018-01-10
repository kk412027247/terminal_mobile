import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TabNavigator, addNavigationHelpers} from 'react-navigation';

import QueryPage from './terminal_mobile/queryPage/queryPage';
import Add from './terminal_mobile/addPage/add';

import FooterTabBar from './terminal_mobile/footer/footerTabBar';

export const AppNavigator = TabNavigator({
  query:{screen: QueryPage},
  add:{screen: Add},
},{
  tabBarPosition:'bottom',
  //开启切换动画，默认IOS没动画
  //animationEnabled:true,
  //自定义底部组件
  tabBarComponent: FooterTabBar,
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
