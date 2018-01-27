import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Header, Left, Body, Right, Title, Content, Footer, FooterTab,Button, Icon, Text} from 'native-base';
import {goBack} from '../actions/navAction';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {selectImages} from '../actions/selectAction';

class Select extends Component {
  

  render() {
    const {goBack, selectImages} = this.props;
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
            <Title>照片选择</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <CameraRollPicker
            groupTypes='All'
            selectSingleItem={true}
            assetType='Photos'
            callback={selectImages}
            backgroundColor={'transparent'}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              active
              title={''}
              onPress={goBack}
            >
              <Icon name={'ios-checkmark-circle-outline'}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

Select.propType = {
  selected: PropTypes.array,
  goBack: PropTypes.func,
  selectImages: PropTypes.func
};

const mapStateToProps = state => ({
  selected: state.selectReducer.selected ,
  width: state.selectReducer.width,
  height: state.selectReducer.height,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack()),
  selectImages: (images,current) => dispatch(selectImages(images,current))
});

export default connect (mapStateToProps,mapDispatchToProps)(Select);
