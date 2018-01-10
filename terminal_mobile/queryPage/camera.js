import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {Container,Header,Left,Body,Right,Button,Icon} from 'native-base';
import Camera from 'react-native-camera';
import {scanBarcode} from '../actions/queryAction'

class BarcodeScan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qrcode: ''
    }
  }

  onBarCodeRead = (e) => this.setState({qrcode: e.data});
  takePicture = () => this.camera.capture()
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
  nav = ()=>{this.props.navigation.goBack()};

  render () {
    const {scanBarcode} = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.nav} title={''}>
              <Icon name={'ios-arrow-back'}/>
            </Button>
          </Left>
          <Body><Text>扫描中...</Text></Body>
          <Right/>
        </Header>
        <View  style={styles.container}>
          <Camera
            style={styles.preview}
            onBarCodeRead={scanBarcode}
            ref={cam => this.camera = cam}
            aspect={Camera.constants.Aspect.fill}
          >
            <Text style={{
              backgroundColor: 'white'
            }}
            >
              {this.state.qrcode}
            </Text>
            <Button
              onPress={this.takePicture}
              title={''}
            >
              <Text>拍照</Text>
            </Button>
          </Camera>
        </View>
      </Container>
    )
  }
}

BarcodeScan.propTypes = {
  barcode:PropTypes.string,
  scanBarcode:PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});


const mapStateToProps = state =>({
  barcode:state.queryReducer.barcode,
});

const mapDispatchToProps = dispatch => ({
  scanBarcode: (event) => dispatch(scanBarcode(event.code))
});

export default connect(mapStateToProps,mapDispatchToProps)(BarcodeScan)
