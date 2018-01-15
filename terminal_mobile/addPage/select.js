import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Container, Header, Left, Body, Right, Content, Button, Icon, Text} from 'native-base';
import {goBack} from '../actions/navAction';
import CameraRollPicker from 'react-native-camera-roll-picker';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  getSelectedImages=(images, current)=> {
    this.setState({
      selected: images,
    });
    console.log(current.uri);
  };

  render() {
    const {goBack} = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              title={''}
              onPress={goBack}
            >
              <Icon name={'ios-arrow-back'}/>
            </Button>
          </Left>
          <Body>
            <Text>图片选择</Text>
          </Body>
          <Right/>
        </Header>
        <Content>
          <CameraRollPicker
            groupTypes='All'
            selected={this.state.selected}
            selectSingleItem={true}
            assetType='Photos'
            callback={this.getSelectedImages}
            backgroundColor={'transparent'}
          />
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack())
});

export default connect (null,mapDispatchToProps)(Select);
