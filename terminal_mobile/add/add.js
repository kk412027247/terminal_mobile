import React from 'react';
import {View,StyleSheet, ImageBackground, Dimensions, Platform, Keyboard} from 'react-native';
import {Container,Header,Left,Body, Right, Title, Content,
  Form, Item, Input, Label, Button, Text, Icon, Spinner}  from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {handleBrand, clean, handleModel, handleTAC, createTAC, toggleStatus, searchHistory} from '../actions/addAction';
import {handleNav} from '../actions/navAction';
import {pickImage, removeImage} from '../actions/selectAction';


class Add extends React.Component{

  state={source:''};

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
    const {handleBrand, handleModel, handleTAC, createTAC, TAC, model, brand,handleNav, imageUri, width, height ,clean,
      status, toggleStatus, fetching, pickImage, removeImage} = this.props;
    const style = {
      width: Dimensions.get('window').height * 0.35 * width/height,
      height: Dimensions.get('window').height * 0.35,
      flexDirection:'column'

    };
    const _style = {...style, marginTop:20};
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
                title={''}
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
                  value={TAC}
                  disabled={status !== 'add'}
                />
                {
                  status !== 'add' ?
                  <Button
                    title={''}
                    transparent
                    onPress={toggleStatus.bind(null,status)}
                  >
                    <Icon
                      style={styles.lockIcon}
                      name={status === 'update'? 'ios-lock':status === 'delete'?'ios-trash':'ios-add'}
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
                  title={''}
                  info
                  style={styles.iconButton}
                  transparent
                  onPress={pickImage}
                >
                  <Icon style={styles.icon} name={'ios-image'}/>
                </Button> :
                <View style={styles.overflow}>
                  <ImageBackground
                    style={_style}
                    source={imageUri !== '' ? {uri:imageUri} : null}
                  >
                    <Button
                      title={''}
                      transparent
                      onPress={handleNav.bind(null,'SHOW_IMAGE')}
                      style={style}>
                      <Button
                        title={''}
                        transparent
                        onPress={pickImage}
                      >
                        <Icon style={styles.replaceIcon} name={'md-refresh-circle'}/>
                      </Button>
                      
                      <Button
                        title={''}
                        transparent
                        onPress={removeImage}
                      >
                        <Icon style={styles.deleteIcon} name={'ios-close'}/>
                      </Button>
                    </Button>
                  </ImageBackground>
                </View>
              }
            </Form>
            {
              fetching ?
              <Spinner/> :
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
            }
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
  overflow:{
    overflow: 'hidden'
  },
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
  deleteIcon:{
    fontSize:40,
    color:'red',
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
  fetching:PropTypes.bool,
  pickImage:PropTypes.func,
  removeImage:PropTypes.func,
};

const mapStateToProps = state => ({
  TAC:state.addReducer.TAC,
  brand:state.addReducer.brand,
  model:state.addReducer.model,
  imageUri:state.selectReducer.imageUri ,
  height:state.selectReducer.height,
  width:state.selectReducer.width,
  status:state.addReducer.status,
  index:state.nav.routes[1].index,
  fetching:state.addReducer.fetching,
});

const mapDispatchToProps = dispatch => ({
  handleBrand: brand =>dispatch(handleBrand(brand)),
  handleModel: model => dispatch(handleModel(model)),
  handleTAC: TAC => dispatch(handleTAC(TAC)),
  createTAC: () => dispatch(createTAC()),
  handleNav:(nav) => {
    dispatch(handleNav(nav));
    Keyboard.dismiss();
  },
  clean:()=> {
    dispatch(clean());
    dispatch(toggleStatus('add'))
  } ,
  searchHistory: () => dispatch(searchHistory()),
  toggleStatus: (status) => {
    if(status === 'update'){
      dispatch(toggleStatus('delete'))
    }else{
      dispatch(toggleStatus('update'))  
    }
  },
  pickImage:() => dispatch(pickImage()),
  removeImage:()=>dispatch(removeImage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
