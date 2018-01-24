import React from 'react';
import {View,StyleSheet, ImageBackground, Dimensions, Platform, Alert} from 'react-native';
import {Container,Header,Left,Body, Right, Title, Content,
  Form, Item, Input, Label, Button, Text, Icon}  from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {handleBrand, clean, handleModel, handleTAC, createTAC, toggleStatus} from '../actions/addAction';
import {handleNav} from '../actions/navAction';
import host from "../../host";


class Add extends React.Component{
  shouldComponentUpdate(nextProps){
    if(nextProps.TAC.length === 8 && nextProps.TAC !== this.props.TAC){
      fetch(`http://${host}:3001/searchHistory`,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({TAC:Number(nextProps.TAC)})
      }).then(res=>res.json())
        .then(result=>{
          if(result){
            Alert.alert('提示','该信息为今天录入／已经缓存',[
              {text:'取消', onPress:()=>this.props.toggleStatus(false)},
              {text:'查看',onPress:()=>this.props.toggleStatus(true)},
            ],{
              cancelable:false
            })
          }
        });
    }
    return nextProps !== this.props
  }
  
  render(){
    const {handleBrand, handleModel, handleTAC, createTAC,
      TAC, model, brand,handleNav, imageUri, width, height ,clean, status} = this.props;
    const style = {width: Dimensions.get('window').height * 0.35 * width/height, height: Dimensions.get('window').height * 0.35};
    const _style = {...style,marginTop:20};
    return(
      <Container >
        <Header>
          {Platform.OS === 'ios' ? <Left/> : <View/>}
          <Body style={Platform.OS === 'android' ? styles.androidHead : {}}><Title>数据录入</Title></Body>
          <Right>
            { brand !== '' ||  model !== '' || TAC !== '' || imageUri !== '' ?
              <Button
                dark
                transparent
                title={''}
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
              <Item
                inlineLabel
                success={TAC.length === 8}
              >
                <Label>TAC</Label>
                <Input
                  onChangeText={handleTAC}
                  value={TAC !== '' ? TAC : null}
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
              <Text>{status === 'add'?' 录 入 ':' 修 改 '}</Text>
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
  }
});


Add.propTypes = {
  handleBrand: PropTypes.func,
  handleModel: PropTypes.func,
  handleTAC: PropTypes.func,
  createTAC: PropTypes.func,
  handleNav: PropTypes.func,
  toggleStatus:PropTypes.func,
  TAC:PropTypes.string,
  brand:PropTypes.string,
  model:PropTypes.string,
  imageUri:PropTypes.string ,
  height: PropTypes.number,
  width: PropTypes.number,
  clean:PropTypes.func,
  status:PropTypes.string,
};

const mapStateToProps = state => ({
  TAC:state.addReducer.TAC,
  brand:state.addReducer.brand,
  model:state.addReducer.model,
  imageUri:state.selectReducer.imageUri ,
  height: state.selectReducer.height,
  width: state.selectReducer.width,
  status: state.addReducer.status,
});

const mapDispatchToProps = dispatch => ({
  handleBrand: brand =>dispatch(handleBrand(brand)),
  handleModel: model => dispatch(handleModel(model)),
  handleTAC: TAC => dispatch(handleTAC(TAC)),
  createTAC: () => dispatch(createTAC()),
  handleNav:(nav) => dispatch(handleNav(nav)),
  clean:()=> {dispatch(clean());dispatch(toggleStatus(false))} ,
  toggleStatus: (bool) => dispatch(toggleStatus(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
