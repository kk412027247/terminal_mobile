import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Image,  Dimensions} from 'react-native';
import {Container,Content,Header,Left,Body,Title,Right,Footer,FooterTab,Button,Icon} from 'native-base';
import {goBack} from '../actions/navAction'

class ShowImage extends React.Component{
  render(){
    const {uri,width,height,goBack} = this.props;
    const style = {
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').width * height / width
    };

    //console.log(uri);
    return(
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={goBack}
              title={''}
            >
              <Icon name={'ios-arrow-back'}/>
            </Button>
          </Left>
          <Body>
            <Title >照片</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Image source={{uri}} style={style}/>
        </Content>
        <Footer>
          <FooterTab>
            <Button active title={''} onPress={goBack}>
              <Icon name={'ios-checkmark-circle-outline'}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

ShowImage.propTypes = {
  uri:PropTypes.string,
  width:PropTypes.number,
  height:PropTypes.number,
  goBack:PropTypes.func,
};

const mapStateToProps = state => ({
  uri:state.selectReducer.imageUri,
  width:state.selectReducer.width,
  height:state.selectReducer.height,
});

const mapDispatchToProps = dispatch => ({
  goBack:()=> dispatch(goBack())
});

export default connect(mapStateToProps,mapDispatchToProps)(ShowImage)
