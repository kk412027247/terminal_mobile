import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {View, Spinner, Button, Text, Icon} from 'native-base';


const Status = ({status, length,empty}) =>(
  <View style={styles.status}>
    {status === 'fetching' ?
      <Spinner/> :
      status === 'success' && length === 0 && !empty ?
      <Button
        block
        success
        style={styles.statusButton}
      >
        <Text style={styles.buttonText}>无匹配数据</Text>
      </Button>:
      status === 'success' && length !== 0 ?
      <Icon name={'ios-checkmark-circle'} style={styles.icon}/> :
      status === 'error' ?
      <View><Icon name={'ios-warning'} /><Text>服务器出错！</Text></View> :
      <Text/>
    }
  </View>
);


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
  empty:state.queryReducer.empty,
});

export default connect(mapStateToProps)(Status);
