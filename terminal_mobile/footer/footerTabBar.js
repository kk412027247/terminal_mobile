import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import {handleNav} from '../actions/navAction';

const FooterTabBar = ({index, navigate}) =>(
  <Footer>
    <FooterTab>
      <Button
        active={index === 0}
        onPress = {navigate.bind(null,'QUERY')}
        title={''}
      >
        <Icon name={index !== 0 ?'ios-search-outline':'ios-search'}/>
      </Button>
      <Button
        active={index === 1}
        onPress = {navigate.bind(null,'ADD')}
        title={''}
      >
        <Icon name={index !== 1?'ios-create-outline':'ios-create'}/>
      </Button>
    </FooterTab>
  </Footer>
);

FooterTabBar.propTypes = {
  index:PropTypes.number,
  navigate:PropTypes.func,
};

const mapStateToProps = state =>({
  index:state.nav.index,
});


const mapDispatchToProps = dispatch =>({
  navigate: nav => dispatch(handleNav(nav))
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterTabBar)
