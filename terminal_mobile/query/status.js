import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {View, Spinner, Button, Text, Icon} from 'native-base';
import {handleNav} from '../actions/navAction';
import {handleTAC} from '../actions/addAction';


const Status = ({status, length, handleNav, content}) =>(
  <View style={styles.status}>
    {status === 'fetching' ?
      <Spinner/> :
      status === 'success' && length === 0 && content.length !== 0 ?
      <Button
        onPress={handleNav.bind(null,'ADD',content)}
        title={''}
        block
        success
        style={styles.statusButton}
      >
        <Text style={styles.buttonText}>无匹配数据, 点击新增</Text>
      </Button>:
      status === 'success' && length !== 0 ?
      <Icon name={'ios-checkmark-circle'} style={styles.icon}/> :
      status === 'error' ?
      <View><Icon name={'ios-warning'} /><Text>服务器出错！</Text></View> :
      <Text/>
    }
  </View>
);

Status.propTypes = {
  status:PropTypes.string,
  length:PropTypes.number,
  content:PropTypes.string,
  handleNav:PropTypes.func,
};

const styles = StyleSheet.create({
  status:{
    marginTop:10,
    height:60,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  statusButton:{
    flex:1,
    alignSelf:'center',
    width:'70%',
  },
  icon:{
    color:'#45D56E'
  },
  buttonText:{
    color: '#ffffff',
    fontSize:18,
  }
});

const mapStateToProps = state =>({
  status:state.queryReducer.status,
  length:state.queryReducer.result.length,
  content:state.queryReducer.content,
});

const mapDispatchToProps = dispatch => ({
  handleNav: (nav,TAC) => {
    dispatch(handleNav(nav));
    if(!!Number(TAC)){
      dispatch(handleTAC(TAC))
    }else{
      dispatch(handleTAC(''))
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);
