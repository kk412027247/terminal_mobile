import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {Container,Header,Left,Body,Right,Button,Icon} from 'native-base';
import Camera from 'react-native-camera';
import {barCodeRead, fetchDate} from '../actions/queryAction' ;
import {goBack} from '../actions/navAction';
let i = 0;

class BarcodeScan extends Component {

  state={flash: Camera.constants.FlashMode.auto};

  takePicture = () => this.camera.capture().then(data=>console.log(data)).catch(err=>console.log(err));

  componentWillUnmount(){
    if(this.props.barcode !== ''){
      this.props.fetchDate(this.props.barcode)
    }
  }

  render () {

    const switchFlash = ()=>{
      const flashes = [
        Camera.constants.FlashMode.auto,
        Camera.constants.FlashMode.on,
        Camera.constants.FlashMode.off,
      ];
      const _i = ++i % 3;
      this.setState({flash:flashes[_i]});
    };

    const {barCodeRead, goBack, barcode} = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={goBack} title={''}>
              <Icon name={'ios-arrow-back'}/>
            </Button>
          </Left>
          <Body><Text>{barcode === '' ? '扫描中...' : 'TAC :' + barcode}</Text></Body>
          <Right/>
        </Header>
        <View  style={styles.container}>
          <Camera
            style={styles.preview}
            onBarCodeRead={barCodeRead}
            ref={cam => this.camera = cam}
            aspect={Camera.constants.Aspect.fill}
            flashMode={this.state.flash}
          >
            <Button
              title={''}
              iconRight
              transparent
              style={styles.flashButton}
              onPress={switchFlash}
            >
              <Text style={styles.text}>{i%3 === 0?'auto  ':i%3 === 1?'on  ':'off  '}</Text>
              <Icon style={styles.flash} name={i%3 === 0?'ios-flash':i%3 === 1?'ios-flash':'ios-flash-outline'}/>
            </Button>
            <Button
              rounded
              style={styles.button}
              transparent
              onPress={this.takePicture}
              title={''}
            >
              <Icon style={styles.icon} name={'ios-radio-button-on'}/>
            </Button>
          </Camera>
        </View>
      </Container>
    )
  }
}

BarcodeScan.propTypes = {
  barcode:PropTypes.string,
  barCodeRead:PropTypes.func,
  goBack:PropTypes.func,
  fetchDate:PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button:{
    alignSelf:'center',
    marginBottom:30,
    height:80,
  },
  icon:{
    fontSize:80,
    color:'#fff'
  },
  flash:{
    color:'#fff',
    fontSize:40,
  },
  flashButton:{
    marginTop:10,
    marginRight:10,
    alignSelf:'flex-end'
  },
  text:{
    color:'#fff'
  }
});


const mapStateToProps = state =>({
  barcode:state.queryReducer.barcode,
});

const mapDispatchToProps = dispatch => ({
  barCodeRead: (event) => dispatch(barCodeRead(event.data)),
  goBack: () => dispatch(goBack()),
  fetchDate: () => dispatch(fetchDate()),
});

export default connect(mapStateToProps,mapDispatchToProps)(BarcodeScan)
