import React from 'react';
import {View,StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {Container,Header,Left,Body, Right, Title, Content, Form, Item, Input, Label, Button, Text, Icon}  from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {handleBrand, handleModel, handleTAC, createTAC} from '../actions/addAction';
import {handleNav} from '../actions/navAction';


class Add extends React.Component{
  render(){
    const {handleBrand, handleModel, handleTAC, createTAC, TAC, model, brand,handleNav, imageUri, width, height} = this.props;
    const style = {width: Dimensions.get('window').height * 0.25 * width/height, height: Dimensions.get('window').height * 0.25};
    const _style = {...style,marginTop:20};
    return(
      <Container >
        <Header>
          <Left/>
          <Body><Title>数据录入</Title></Body>
          <Right/>
        </Header>
        <Content  >
          <View style={styles.content}>
            <Form style={styles.form}>
              <Item
                floatingLabel
                success={brand !== ''}
                
              >
                <Label>厂家（中文）</Label>
                <Input onChangeText={handleBrand}/>
              </Item>
              <Item
                floatingLabel
                success={model !== ''}
              >
                <Label>型号</Label>
                <Input onChangeText={handleModel}/>
              </Item>
              <Item
                floatingLabel
                success={TAC.length === 8}
              >
                <Label>TAC</Label>
                <Input
                  onChangeText={handleTAC}
                  value={TAC}
                />
              </Item>
              {
                imageUri === '' ?
                <Button
                  info
                  style={styles.iconButton}
                  transparent
                  title={''}
                  onPress={handleNav.bind(null,'TO_SELECT')}
                >
                  <Icon style={styles.icon} name={'ios-image'}/>
                </Button> :
                <ImageBackground
                  style={_style}
                  source={imageUri !== '' ? {uri:imageUri} : null}
                >
                  <Button
                    transparent
                    title={''}
                    onPress={handleNav.bind(null,'SHOW_IMAGE')}
                    style={style}>
                    <Button
                      transparent
                      title={''}
                      onPress={handleNav.bind(null,'TO_SELECT')}
                    >
                      <Icon style={styles.replaceIcon} name={'md-refresh-circle'}/>
                    </Button>
                  </Button>
                </ImageBackground>
              }
            </Form>
            <Button
              onPress={createTAC}
              block
              primary
              style={styles.button}
              title={''}>
              <Text> 录 入 </Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}



const styles = StyleSheet.create({
  container:{
    alignItems:'center',
  },
  content:{
    alignItems:'center',
  } ,
  form:{
    width:'80%',
  },
  button:{
    marginTop:40,
    width:'80%',
    alignSelf:'center',
  },
  iconButton:{
    marginTop:40,
  },
  icon:{
    fontSize:60,
  },
  replaceIcon:{
    fontSize:40,
    color:'#ffffff',
    fontWeight:'bold'
  }
});


Add.propTypes = {
  handleBrand: PropTypes.func,
  handleModel: PropTypes.func,
  handleTAC: PropTypes.func,
  createTAC: PropTypes.func,
  handleNav: PropTypes.func,
  TAC:PropTypes.string,
  brand:PropTypes.string,
  model:PropTypes.string,
  imageUri:PropTypes.string ,
  height: PropTypes.number,
  width: PropTypes.number,
};

const mapStateToProps = state => ({
  TAC:state.addReducer.TAC,
  brand:state.addReducer.brand,
  model:state.addReducer.model,
  imageUri:state.selectReducer.imageUri ,
  height: state.selectReducer.height,
  width: state.selectReducer.width,
});

const mapDispatchToProps = dispatch => ({
  handleBrand: brand =>dispatch(handleBrand(brand)),
  handleModel: model => dispatch(handleModel(model)),
  handleTAC: TAC => dispatch(handleTAC(TAC)),
  createTAC: () => dispatch(createTAC()),
  handleNav:(nav) => dispatch(handleNav(nav))
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
