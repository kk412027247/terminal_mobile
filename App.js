import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import AppWithNavigator from './terminal_mobile/navigator/navigator';

const AppWithNavigationState = ({dispatch, nav})=>(
  <AppWithNavigator navigation={addNavigationHelpers({dispatch, state:nav})}/>
);

AppWithNavigationState.propTypes ={
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({nav: state.nav});

export default connect(mapStateToProps)(AppWithNavigationState);
