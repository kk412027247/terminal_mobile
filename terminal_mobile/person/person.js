import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View,Text, StyleSheet} from 'react-native';
import {Container,Header,Left,Body,Right,Title,Content,Card,CardItem,Icon,Button} from 'native-base';

const Person = () =>(
  <Container>
    <Header>
      <Left/>
      <Body>
        <Title>修改记录</Title>
      </Body>
      <Right/>
    </Header>
    <Content padder>
      <Card style={styles.card}>
        <View style={styles.left}>
          <CardItem header>
            <Icon style={styles.saveIcon} name={'ios-cloud-done'}/>
            <Text style={styles.saveTitle}>已保存</Text>
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
          <CardItem footer>
            <Text>2018/01/15</Text>
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
          <CardItem footer>
            <Text>2018/01/15</Text>
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
    marginRight:-30
  },
  pageButton:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20 ,
    marginBottom:20,
  },
  displayIcon:{
    color:'#7b1fa2'
  } 
});

export default connect()(Person)

