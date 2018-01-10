import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native'
import {Icon, Text, Button} from 'native-base';
import {openCamera} from '../actions/navAction';


const Scan = ({openCamera})=>(
  <View
    contentContainerStyle ={styles.content}
  >
    <View style={styles.buttonBox}>
      <Button
        onPress={openCamera}
        title={''}
        style={styles.button}
        transparent
      >
        <Icon name={'md-qr-scanner'} style={styles.buttonIcon}/>
      </Button>
    </View>

    <View style={styles.textBox}>
      <Text style={styles.text}>
        点击扫描
      </Text>

    </View>
  </View>
);

Scan.propTypes = {
  openCamera:PropTypes.func,
} ;

const styles = StyleSheet.create({
  content:{
    backgroundColor:'#cdd53f'
  },
  buttonBox:{
    paddingTop:20,
    flexBasis:'50%',
  },
  button:{
    flex:1,
  },
  buttonIcon:{
    fontSize:170
  },
  textBox:{
    alignItems:'center',
    flexBasis:'50%',
    paddingTop:20,
  },
  text:{
    fontSize:25,
    fontWeight:'bold',
    color:'#2a7ef6'
  }
});



const mapDispatchToProps = dispatch =>({
  openCamera:()=>dispatch(openCamera()),
});

export default connect(null,mapDispatchToProps)(Scan)
