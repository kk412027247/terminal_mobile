import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Container,Header,Left,Body, Right, Title, Content, Form, Item, Input, Label, Button, Text, Icon}  from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {handleBrand, handleModel, handleTAC, createTAC} from '../actions/addAction';
import {handleNav} from '../actions/navAction';

const Add = ({handleBrand, handleModel, handleTAC, createTAC, TAC, handleNav})=>(
  <Container >
    <Header>
      <Left/>
      <Body><Title>数据录入</Title></Body>
      <Right/>
    </Header>
    <Content  >
      <View style={styles.content}>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>厂商（中文）</Label>
            <Input onChangeText={handleBrand}/>
          </Item>
          <Item floatingLabel>
            <Label>品牌（英文）</Label>
            <Input onChangeText={handleModel}/>
          </Item>
          <Item floatingLabel last>
            <Label>TAC</Label>
            <Input
              onChangeText={handleTAC}
              value={TAC}
            />
          </Item>
          <Button
            info
            style={styles.iconButton}
            transparent
            title={''}
            onPress={handleNav.bind(null,'TO_SELECT')}
          >
            <Icon style={styles.icon} name={'ios-image'}/>
          </Button>
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
);

Add.propTypes = {
  handleBrand: PropTypes.func,
  handleModel: PropTypes.func,
  handleTAC: PropTypes.func,
  createTAC: PropTypes.func,
  handleNav: PropTypes.func,
};

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
  }
});


const mapStateToProps = state => ({
  TAC:state.addReducer.TAC,
});

const mapDispatchToProps = dispatch => ({
  handleBrand: brand =>dispatch(handleBrand(brand)),
  handleModel: model => dispatch(handleModel(model)),
  handleTAC: TAC => dispatch(handleTAC(TAC)),
  createTAC: () => dispatch(createTAC()),
  handleNav:(nav) => dispatch(handleNav(nav))
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
