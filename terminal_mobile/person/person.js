import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View,Text, StyleSheet,Platform} from 'react-native';
import {Container,Header,Left,Body,Right,Title,Content,Card,CardItem,Icon,Button} from 'native-base';

const Person = () =>(
  <Container>
    <Header>
      {Platform.OS === 'ios' ? <Left/> : <View/>}
      <Body style={Platform.OS === 'android' ? styles.androidHead : {}}>
        <Title>个人中心</Title>
      </Body>
      <Right>
        <Button
          title={''}
          onPress={()=>{}}
          transparent
        >
          <Icon style={styles.personalIcon} name={'ios-person'}/>
        </Button>
      </Right>
    </Header>
    <Content padder>
      <Card style={styles.card}>
        <View style={styles.left}>
          <CardItem header>
            <Icon style={styles.saveIcon} name={'ios-cloud-done'}/>
            <Text style={styles.saveTitle}>已保存</Text>
            <Right>
              <Button
                dark
                style={styles.updateButton}
                transparent
                onPress={()=>{}}
                title={''}
              >
                <Icon name={'md-create'}/>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Text style={styles.saveTitle}>厂商: </Text>
            <Text>三星</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.saveTitle}>型号: </Text>
            <Text>galaxy note 8</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.saveTitle}>TAC: </Text>
            <Text>12345678</Text>
          </CardItem>
        </View>
        <View style={styles.right}>
          <Text>123</Text>
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.left}>
          <CardItem header>
            <Icon style={styles.unSaveIcon} name={'ios-clock'}/>
            <Text style={styles.unSaveTitle}>未保存</Text>
            <Right>
              <Button
                dark
                style={styles.updateButton}
                transparent
                onPress={()=>{}}
                title={''}
              >
                <Icon name={'md-create'}/>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Text style={styles.unSaveTitle}>厂商: </Text>
            <Text>三星</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.unSaveTitle}>型号: </Text>
            <Text>galaxy note 8</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.unSaveTitle}>TAC: </Text>
            <Text>12345678</Text>
          </CardItem>
        </View>
         <View style={styles.right}>
           <Text>456</Text>
         </View>
      </Card>
      
      <View style={styles.pageButton}>
        <Button
          transparent
          title={''}
          onPress={()=>{}}
        >
          <Icon name={'ios-arrow-back'}/>
        </Button>
        <Text>2018/01/15</Text>
        <Button
          transparent
          title={''}
          onPress={()=>{}}
        >
          <Icon name={'ios-arrow-forward'}/>
        </Button>
      </View>
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  card:{
    marginBottom:10,
    flexDirection:'row'
  },
  androidHead:{
    marginLeft:'10%'
  },
  left:{
    flex:1
  },
  right:{
    width:100,
    backgroundColor:'#c35ccc'
  },
  saveTitle:{
    fontWeight:'bold',
    color:'#43a047'
  },
  saveIcon:{
    color:'#43a047'
  },
  unSaveTitle:{
    fontWeight:'bold',
    color:'#ffb300',
  } ,
  unSaveIcon:{
    color:'#ffb300'
  },
  updateButton:{
    height:15,
    marginRight:0
  },
  pageButton:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:20 ,
    marginBottom:20,
  },
  personalIcon:{
    color: Platform.OS === 'ios' ? '#3f3f3f' : '#f2f2f2'
  } 
});

export default connect()(Person)

