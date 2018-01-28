import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import {handleNav} from '../actions/navAction';
import {handleTAC} from "../actions/addAction";

const FooterTabBar = ({index, navigate, content}) =>(
  <Footer>
    <FooterTab>
      <Button
        active={index === 0}
        onPress = {navigate.bind(null,'QUERY',content)}
        title={''}
      >
        <Icon name={index !==0 ?'ios-search-outline':'ios-search'}/>
      </Button>
      <Button
        active={index === 1}
        onPress = {navigate.bind(null,'ADD',content)}
        title={''}
      >
        <Icon name={index !== 1 ?'ios-create-outline':'ios-create'}/>
      </Button>
      <Button
        title={''}
        onPress = {navigate.bind(null,'History',content)}
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
};

const mapStateToProps = state =>({
  index:state.nav.routes[1].index,
  content: state.addReducer.TAC !== '' ? state.addReducer.TAC : state.queryReducer.content,

});


const mapDispatchToProps = dispatch =>({
  navigate: (nav, TAC) => {
    dispatch(handleNav(nav));
    if(!!Number(TAC)){
      dispatch(handleTAC(TAC))
    }else{
      dispatch(handleTAC(''))
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterTabBar)
