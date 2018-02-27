import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import {handleNav} from '../actions/navAction';
import {handleTAC} from "../actions/addAction";

const FooterTabBar = ({index, navigate, content, showResult, nav}) =>(
  <Footer>
    <FooterTab>
      <Button
        active={index === 0}
        onPress = {navigate.bind(null,'QUERY',content,showResult)}
        title={''}
      >
        <Icon name={index !==0 ?'ios-search-outline':'ios-search'}/>
      </Button>
      <Button
        active={index === 1}
        onPress = {navigate.bind(null,'ADD',content,showResult)}
        title={''}
      >
        <Icon name={index !== 1 ?'ios-create-outline':'ios-create'}/>
      </Button>
      <Button
        title={''}
        onPress = {navigate.bind(null,'HISTORY',content,showResult)}
        active = {index === 2}
      >
        <Icon name={index !==2 ? 'ios-folder-open-outline':'ios-folder-open'}/>
      </Button>
    </FooterTab>
  </Footer>
);

FooterTabBar.propTypes = {
  index:PropTypes.number,
  navigate:PropTypes.func,
  content: PropTypes.string,
  showResult: PropTypes.bool,
};

const mapStateToProps = state =>({
  nav:state.nav,
  index:state.nav.routes[1].index,
  content: state.addReducer.TAC !== '' ? state.addReducer.TAC : state.queryReducer.content,
  showResult: state.queryReducer.result.length !== 0
});


const mapDispatchToProps = dispatch =>({
  navigate: (nav, TAC,showResult) => {
    dispatch(handleNav(nav));
    if(!!Number(TAC) && !showResult){
      dispatch(handleTAC(TAC))
    }else{
      dispatch(handleTAC(''))
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterTabBar)
