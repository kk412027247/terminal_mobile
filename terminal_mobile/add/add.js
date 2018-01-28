import React from 'react';
import {View,StyleSheet, ImageBackground, Dimensions, Platform} from 'react-native';
import {Container,Header,Left,Body, Right, Title, Content,
  Form, Item, Input, Label, Button, Text, Icon}  from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {handleBrand, clean, handleModel, handleTAC, createTAC, toggleStatus, searchHistory} from '../actions/addAction';
import {handleNav} from '../actions/navAction';
let i = 0;
const statuses = ['update','delete'];

class Add extends React.Component{

  shouldComponentUpdate(nextProps){
    if(nextProps.TAC.length === 8 && nextProps.TAC !== this.props.TAC && this.props.index !==2){
      nextProps.searchHistory()
    }
    if(this.props.index === 1 && nextProps.index !== 1){
      this.props.clean();
    }
    return nextProps !== this.props
  }

  render(){
    const {handleBrand, handleModel, handleTAC, createTAC,
      TAC, model, brand,handleNav, imageUri, width, height ,clean, status, toggleStatus} = this.props;
    const style = {
      width: Dimensions.get('window').height * 0.35 * width/height,
      height: Dimensions.get('window').height * 0.35
    };
    const _style = {...style,marginTop:20};
    return(
      <Container >

        <Header>
          {Platform.OS === 'ios' ? <Left/> : <View/>}
          <Body style={Platform.OS === 'android' ? styles.androidHead : {}}>
            <Title>{status==='add'?'录入':status==='update'?'修改':'删除'}数据</Title>
          </Body>
          <Right>
            { brand !== '' ||  model !== '' || TAC !== '' || imageUri !== '' ?
              <Button
                dark
                transparent
                onPress={clean}
              >
                <Icon style={styles.cleanIcon} name={'ios-close'}/>
              </Button> :
              <View/>
            }
          </Right>
        </Header>
        <Content>
          <View style={styles.content}>
            <Form style={styles.form}>
              <Item
                inlineLabel
                success={TAC.length === 8}
              >
                <Label>TAC</Label>
                <Input
                  onChangeText={handleTAC}
                  value={TAC !== '' ? TAC : null}
                  disabled={status !== 'add'}
                />
                {
                  status !== 'add' ?
                  <Button
                    transparent
                    onPress={toggleStatus}
                  >
                    <Icon
                      style={styles.lockIcon}
                      name={status === 'update'?name='ios-lock':status === 'delete'?'ios-trash':'ios-add'}
                    />
                  </Button> :
                  <View/>  
                }

              </Item>
              <Item
                inlineLabel
                success={brand !== ''}
              >
                <Label>厂商</Label>
                <Input onChangeText={handleBrand} value={brand}/>
              </Item>
              <Item
                inlineLabel
                success={model !== ''}
              >
                <Label>型号</Label>
                <Input value={model} onChangeText={handleModel}/>
              </Item>
              {
                imageUri === '' ?
                <Button
                  info
                  style={styles.iconButton}
                  transparent
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
                    onPress={handleNav.bind(null,'SHOW_IMAGE')}
                    style={style}>
                    <Button
                      transparent
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
              primary={status === 'add'}
              warning={status === 'update'}
              danger={status === 'delete'}
              style={styles.button}
              title={''}>
              <Text>{status === 'add'?' 录 入 ':status === 'update'?' 修 改 ':' 删 除 '}</Text>
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
  androidHead:{
    marginLeft:'10%'
  },
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
  } ,
  cleanIcon:{
    color: Platform.OS === 'ios' ? '#000000' : '#ffffff'
  },
  lockIcon:{
    color:'#606161'
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
  clean:PropTypes.func,
  status:PropTypes.string,
  searchHistory:PropTypes.func,
  toggleStatus:PropTypes.func,
};

const mapStateToProps = state => ({
  TAC:state.addReducer.TAC,
  brand:state.addReducer.brand,
  model:state.addReducer.model,
  imageUri:state.selectReducer.imageUri ,
  height: state.selectReducer.height,
  width: state.selectReducer.width,
  status: state.addReducer.status,
  index: state.nav.routes[1].index,
});

const mapDispatchToProps = dispatch => ({
  handleBrand: brand =>dispatch(handleBrand(brand)),
  handleModel: model => dispatch(handleModel(model)),
  handleTAC: TAC => dispatch(handleTAC(TAC)),
  createTAC: () => dispatch(createTAC()),
  handleNav:(nav) => dispatch(handleNav(nav)),
  clean:()=> {
    dispatch(clean());
    dispatch(toggleStatus('add'))
  } ,
  searchHistory: () => dispatch(searchHistory()),
  toggleStatus: () => dispatch(toggleStatus(statuses[ ++i % 2 ]))

});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
